import React from 'react'
import { View, Image, Text, TouchableOpacity, Platform, Alert} from 'react-native';
import Slider from '@react-native-community/slider'
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const img_pause = require('../assets/icons/ui_pause.png');
const img_play = require('../assets/icons/ui_play.png');

export default class Player extends React.Component{

    static navigationOptions = props => ({
        title:props.navigation.state.params.title,
    })

    constructor(){
        super();
        this.state = {
            playState:'paused', //playing, paused
            playSeconds:0,
            duration:0
        }
        this.sliderEditing = false;
    }

    async componentDidMount (){
        console.log("ttttttttttttttttt", this.props.url)
        this.sound = new Sound(this.props.url, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                Alert.alert('Notice', 'audio file error. (Error code : 1)');
                this.setState({playState:'paused'});
            }else{
                this.setState({duration:this.sound.getDuration()});
                // this.sound.play(this.playComplete);
            }
        });    
        this.timeout = setInterval(() => {
            if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds:seconds});
                })
            }
        }, 100);
    }
    componentWillUnmount(){
        if(this.sound){
            this.sound.release();
            this.sound = null;
        }
        if(this.timeout){
            clearInterval(this.timeout);
        }
    }

    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }
    onSliderEditing = value => {
        if(this.sound){
            this.sound.setCurrentTime(value);
            this.setState({playSeconds:value});
        }
    }

    play = async () => {
            this.sound.play(this.playComplete);
            this.setState({playState:'playing'});
        // if(this.sound){
        //     this.sound.play(this.playComplete);
        //     this.setState({playState:'playing'});
        // }else{
        //     this.sound = new Sound(this.props.url, Sound.MAIN_BUNDLE, (error) => {
        //         if (error) {
        //             console.log('failed to load the sound', error);
        //             Alert.alert('Notice', 'audio file error. (Error code : 1)');
        //             this.setState({playState:'paused'});
        //         }else{
        //             this.setState({playState:'playing', duration:this.sound.getDuration()});
        //             this.sound.play(this.playComplete);
        //         }
        //     });    
        // }
    }
    playComplete = (success) => {
        if(this.sound){
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({playState:'paused', playSeconds:0});
            this.sound.setCurrentTime(0);
        }
    }

    pause = () => {
        if(this.sound){
            this.sound.pause();
        }

        this.setState({playState:'paused'});
    }   

    getAudioTimeString(seconds){
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);

        return ((m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }

    render(){

        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);

        return (
            <View style={{flex:1, justifyContent:'center', backgroundColor:'#f0f0f0', borderRadius:30, padding: 10}}>
                <View style={{marginHorizontal:5, flexDirection:'row'}}>
                    {this.state.playState == 'playing' && 
                    <TouchableOpacity onPress={this.pause} style={{marginHorizontal:10, marginTop:2}}>
                        <FontAwesome name="pause" color='#000' size={15}/>
                    </TouchableOpacity>}
                    {this.state.playState == 'paused' && 
                    <TouchableOpacity onPress={this.play} style={{marginHorizontal:10, marginTop:2}}>
                        <FontAwesome name="play" color='#000' size={15}/>
                    </TouchableOpacity>}
                    <Text style={{color:'#000', alignSelf:'center'}}>{currentTimeString}</Text>
                    <Text style={{color:'#000', marginHorizontal: 5}}>/</Text>
                    <Text style={{color:'#000', alignSelf:'center'}}>{durationString}</Text> 
                    <Slider
                        onTouchStart={this.onSliderEditStart}
                        onTouchEnd={this.onSliderEditEnd}
                        // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                        // onTouchCancel={() => console.log('onTouchCancel')}
                        onValueChange={this.onSliderEditing}
                        value={this.state.playSeconds} maximumValue={this.state.duration} 
                        maximumTrackTintColor='#000' 
                        minimumTrackTintColor='#000' 
                        thumbTintColor='#000' 
                        style={{flex:1, alignSelf:'center', marginHorizontal:Platform.select({ios:5})}}/>
                </View>
            </View>
        )
    }
}