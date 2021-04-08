import React, {Fragment, useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TagInput from 'react-native-tags-input';
import { connect } from "react-redux";
import {
  saveRootDetailsData
} from '../../actions/actions';
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './index.style';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Details = (props) => {

  const [description,setDescription] = useState('');
  const [instruction,setInstruction] = useState('');
  const [tags,setTags] = useState({
    tag: '',
    tagsArray: []
  });
  const [image,setImage] = useState(null);
  const [video1,setVideo1] = useState('');
  const [video2,setVideo2] = useState('');
  const [video3,setVideo3] = useState('');
  const [video4,setVideo4] = useState('');
  const [video5,setVideo5] = useState('');
  const [video6,setVideo6] = useState('');
  const [lengthOfDescription,setLengthOfDescription] = useState(0);
  const [addNewVideoCount,setAddNewVideoCount] = useState(0);

  const [errors, setErros] = useState([
    { error: '' },//description : 0 
    { error: '' },//image : 1
  ]);

  //handle details page complete or not
  useEffect(()=>{
    if(props.showDetailsPageError) handleDetailsPageNext()
  },[props.showDetailsPageError])

  //handle data from reducer
  useEffect(()=>{
    if(props.root){
      if(props.root.description) setDescription(props.root.description);
      if(props.root.instruction) setInstruction(props.root.instruction);
      if(props.root.tags) setTags(props.root.tags);
      if(props.root.image) setImage(props.root.image);
      if(props.root.videos) {
        setVideo1(props.root.videos[0] ? props.root.videos[0] : '');
        setVideo2(props.root.videos[1] ? props.root.videos[1] : '');
        setVideo3(props.root.videos[2] ? props.root.videos[2] : '');
        setVideo3(props.root.videos[3] ? props.root.videos[3] : '');
        setVideo3(props.root.videos[4] ? props.root.videos[4] : '');
        setVideo3(props.root.videos[5] ? props.root.videos[5] : '');
      }
      
    }
  },[props.root])


  const handlePricingSaveAsDraft = () => {
    const formData = new FormData();

      //data from title screen
      formData.append('r_title',props.root.rootTitle);
      formData.append('r_category_id',props.root.category); 
      formData.append('r_subcategory_ids',props.root.subCategory);

    if(!props.root.isPriceFlexible){
      //fixed price
      formData.append('r_price_status',props.root.isPriceFlexible ? 1 : 0);//0 = Fixed,1=Flexibel
      formData.append('r_fiixed_price[price]',props.root.price);
      formData.append('r_fiixed_price[max_days]',props.root.deliveryDays);
      formData.append('r_minimum_price',props.root.price);
    }else{
      //flexible price
      formData.append('r_minimum_price',Math.min(props.root.basicPrice,props.root.standardPrice,props.root.premiumPrice));
      formData.append('r_price_status',props.root.isPriceFlexible ? 1 : 0);//0 = Fixed,1=Flexibel
      formData.append('r_flexible_price[basic][name]',props.root.basicName);
      formData.append('r_flexible_price[standard][name]',props.root.standardName);
      formData.append('r_flexible_price[premium][name]',props.root.premiumName);
      formData.append('r_flexible_price[basic][description]',props.root.basicDescription);
      formData.append('r_flexible_price[standard][description]',props.root.standardDescription);
      formData.append('r_flexible_price[premium][description]',props.root.premiumDescription);
      formData.append('r_flexible_price[basic][max_days]',props.root.basicMaxDays);
      formData.append('r_flexible_price[standard][max_days]',props.root.standardMaxDays);
      formData.append('r_flexible_price[premium][max_days]',props.root.premiumMaxDays);
      formData.append('r_flexible_price[basic][price]',props.root.basicPrice);
      formData.append('r_flexible_price[standard][price]',props.root.standardPrice);
      formData.append('r_flexible_price[premium][price]',props.root.premiumPrice);
      formData.append('r_flexible_price[basic][revision]',props.root.basicRevision);
      formData.append('r_flexible_price[standard][revision]',props.root.standardRevision);
      formData.append('r_flexible_price[premium][revision]',props.root.premiumRevision);
    } 
    if(props.root.isExtraFastDelivery){
      //extra fast delivery
      formData.append('r_extra[fast_delivery][price]',fastDeliveryPrice);
      formData.append('r_extra[fast_delivery][max_days]',fastDeliveryDays);
    }
    if(props.root.isRevision){
      //revision
      formData.append('r_extra[revision][price]',revisionPrice);
      formData.append('r_extra[revision][max_days]',revisionDays);
    }
    if(props.root.isExtra1){
      //extra1
      formData.append('r_extra[extra1][description]',props.root.extra1Description);
      formData.append('r_extra[extra1][price]',props.root.extra1Price);
      formData.append('r_extra[extra1][max_days]',props.root.extra1Days);
    }
    if(props.root.isExtra2){
      //extra2
      formData.append('r_extra[extra2][description]',props.root.extra2Description);
      formData.append('r_extra[extra2][price]',props.root.extra2Price);
      formData.append('r_extra[extra2][max_days]',props.root.extra2Days);
    }
    if(props.root.isExtra3){
      //extra3
      formData.append('r_extra[extra3][description]',props.root.extra3Description);
      formData.append('r_extra[extra3][price]',props.root.extra3Price);
      formData.append('r_extra[extra3][max_days]',props.root.extra3Days);
    }

    //Details page data 
    formData.append('r_desc',description);
    formData.append('r_instruction_to_buyer',instruction); 
    props.root.videos.map(item=>{
      if (item != ""){
        video.push(item);
      }
    })
    formData.append('r_video_link[]',video.join());
    let allTags = tags.tagsArray;
    formData.append('r_tags',props.root.tags.tagsArray.join());

    //files and videos remaing 
    // formData.append('r_video_link[]',[video1,video2,video3])
    // formData.append('r_root_file[]',image)

    formData.append('r_type',1);//draft 
    props.handlePostRoot(formData)
  }

  //handleDescription
  const handleDescription = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[0].error = 'Root description can not be blank!';
    } else if (value.length < 150) {
      ERRORS[0].error = 'Description must be at least 150 characters.';
    }else if(value.length > 2500) {
      ERRORS[0].error = 'Description must be less then 2500 characters.';
    } else {
      ERRORS[0].error = '';
    }
    setErros(ERRORS)

    setLengthOfDescription(value.length);
    setDescription(value);
  };

  //handleInstruction
  const handleInstruction = (value) => {
    setInstruction(value)
  }


  const pickImage = () => {
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log("uploading image",response.path)
        const source = {uri: 'file://'+response.path};
        setImage(source)
      }
    });
  };

  //handleBackPage
  const handleBackPage = () => {
    let rootData = {
      description,
      tags:tags,
      instruction,
      image,
      videos:[video1,video2,video3]
    }

    props.dispatch(saveRootDetailsData(rootData))
    props.nextScreen('Pricing')
  }

  //handleDetailsPageNext
  const handleDetailsPageNext = () => {
    
    let ERRORS = [
      { error: '' },//description : 0 
      { error: '' },//image : 1
    ];

    // 
    if(!description) 
    {
      ERRORS[0].error = 'Root description can not be blank!';
    }
    if (!image) {
      ERRORS[1].error = 'You have to upload at least 1 image'
    }

    setErros(ERRORS)
    if(!description || !image) return
    let rootData = {
      description,
      tags:tags,
      instruction,
      image,
      videos:[video1,video2,video3,video4,video5,video6]
    }

    props.dispatch(saveRootDetailsData(rootData))
    props.setIsDetailsPageComplete(true)
    props.nextScreen('Review')
  }

    return (
      <>
        {
          errors.map((item, index) => {
            if (item.error) {
              return (
                <View key={index} style={styles.errorContainer}>
                  <Text style={styles.error}>
                    {item.error}
                  </Text>
                </View>
              )
            }
          })
        }
       <View style={styles.container}>
        <View style={styles.rootDescription}>
        <TextInput
          numberOfLines={6}
          multiline={true}
          placeholder="*Root Description"
          style={styles.input}
          onChangeText={value => handleDescription(value)}
          value={description}
        />
          <Text>{lengthOfDescription}/2500 Characters</Text>
        </View>
        <TextInput
          numberOfLines={6}
          multiline={true}
          placeholder="Requirements ( Tell your buyer what you need to get started )"
          onChangeText={value => handleInstruction(value)}
          style={styles.input}
          value={instruction}
        />
        {/*Tags*/}
        <TagInput 
          updateState={(newTags) => setTags(newTags)} 
          placeholder="Search tags: Separate by space" 
          labelStyle={{color: '#fff'}}
          inputStyle={styles.inputSmall}
          tagStyle={styles.tag}
          containerStyle={styles.tagContainer}
          tagTextStyle={styles.tagText}
          tags={tags}  
        />
        {/*Image*/}
        <View>
          <Text style={styles.uploadText}>Upload root image/audio/video</Text>
          <Text>(only image file will be visible at first position)</Text>
          <TouchableOpacity style={styles.inputDash} onPress={pickImage}>
            {image ?
            <View style={styles.imageView}>
              <Image 
              style={styles.image}
              source={image}
              />
              <TouchableOpacity onPress={() => setImage(null)} style={{position:'absolute', top:5, right:5}}>
                <Icon name='delete' color='#748f9e' size={30}/>
              </TouchableOpacity>
            </View>
            :
            <Text style={{color: '#10A2EF'}}>Drag and Drop Images</Text>
            }
          </TouchableOpacity>
        </View>
        {/*Video links*/}
        <View>
          <Text style={styles.uploadText}>Add video URL if needed</Text>
          <TextInput 
            onChangeText={value => setVideo1(value)}
            value={video1}
            placeholder="Video link (YouTube/Vimeo)" 
            style={styles.inputSmall} 
          />
          {
            addNewVideoCount >= 1 ? 
            <TextInput 
              onChangeText={value => setVideo2(value)}
              value={video2}
              placeholder="Video link (YouTube/Vimeo)" 
              style={styles.inputSmall} 
            />
            : null
          }
          {
            addNewVideoCount >= 2 ?
            <TextInput 
              onChangeText={value => setVideo3(value)}
              value={video3}
              placeholder="Video link (YouTube/Vimeo)" 
              style={styles.inputSmall} 
            />
            : null
          }
           {
            addNewVideoCount >= 3 ?
            <TextInput 
              onChangeText={value => setVideo4(value)}
              value={video4}
              placeholder="Video link (YouTube/Vimeo)" 
              style={styles.inputSmall} 
            />
            : null
          }
           {
            addNewVideoCount >= 4 ?
            <TextInput 
              onChangeText={value => setVideo5(value)}
              value={video5}
              placeholder="Video link (YouTube/Vimeo)" 
              style={styles.inputSmall} 
            />
            : null
          }
          {
            addNewVideoCount >= 5 ?
            <TextInput 
              onChangeText={value => setVideo6(value)}
              value={video6}
              placeholder="Video link (YouTube/Vimeo)" 
              style={styles.inputSmall} 
            />
            : null
          }
        </View>
        {/* + Add video */}
        <>
        {
          addNewVideoCount < 5 ?
          <Text
            onPress={() => setAddNewVideoCount(addNewVideoCount + 1)}
            style={styles.addNewVideoText}>
            + Add More Video
          </Text>
            : null
        }
        </>
       <View 
        style={styles.buttonsContainer}
        > 
           <TouchableOpacity
            style={[styles.button_wrapper,{backgroundColor: '#748f9e'}]}
            onPress={handleBackPage}>
            <Text style={styles.button_text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button_wrapper,{backgroundColor: '#10a2ef'}]}
            onPress={handlePricingSaveAsDraft}>
            <Text style={styles.button_text}>Save as Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.button_wrapper,{backgroundColor: '#2ec09c'}]}
              onPress={handleDetailsPageNext}>
            <Text style={styles.button_text}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      </>
     );
  }

const mapStateToProps = state => {
  return {
    root: state.addRoot,
  };
};



const DetailsScreen = connect(
  mapStateToProps,
)(Details);
export default DetailsScreen;

