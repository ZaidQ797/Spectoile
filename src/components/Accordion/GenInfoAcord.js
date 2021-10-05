import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Platform, Text} from 'react-native';
import {Accordion, DropDown, Spacer, Input, UploadCard} from '../../components';
import I18n from '../../translation';
import {WP, HP, family, size} from '../../utilities';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';

const GenInfoAccord = ({title, expanded, onToggle}) => {
  const titleRef = useRef();
  const descRef = useRef();
  const extractRef = useRef();

  const [titlePics, setTitlePics] = useState([]);
  const [titleText, setTitleText] = useState('');
  const [desc, setDesc] = useState('');
  const [seoId, setSeoId] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredPics, setFeaturedPics] = useState([]);
  const [isListFeatured, setIsListFeatured] = useState([
    {
      label: I18n.t('default'),
      value: 'default',
    },
    {
      label: I18n.t('yes'),
      value: 'yes',
    },
    {
      label: I18n.t('no'),
      value: 'no',
    },
  ]);
  const [priceRange, setPriceRange] = useState([
    {
      label: I18n.t('no_price_range'),
      value: 0,
    },
    {
      // label: I18n.t('low'),
      label: '$',
      value: 1,
    },
    {
      // label: I18n.t('cheap'),
      label: '$$',
      value: 2,
    },
    {
      //label: I18n.t('medium'),
      label: '$$$',
      value: 3,
    },
    {
      //label: I18n.t('expensive'),
      label: '$$$$',
      value: 4,
    },
    {
      // label: I18n.t('luxury'),
      label: '$$$$$',
      value: 5,
    },
  ]);

  const {addListObj} = useSelector((state) => state.listings);

  //set already filled values
  useEffect(() => {
    setTitleText(addListObj.title);
    setDesc(addListObj.description);
    setSeoId(addListObj.listing_id);
    setExcerpt(addListObj.excerpt);
    setTitlePics([addListObj.title_logo_image]);
    setFeaturedPics(addListObj.featured_images);
  }, [addListObj]);

  const renderImage = ({item, index}) => (
    <Image source={{uri: item?.uri}} style={styles.image} />
  );

  const changeIOSImageName = (fileName) => {
    let newName = fileName;
    if (
      Platform.OS === 'ios' &&
      (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
    ) {
      newName = `${fileName.split('.')[0]}.JPG`;
      return newName;
    }
    return newName;
  };

  const onPhotoPress = (type) => {
    try {
      ImagePicker.openPicker({
        multiple: type === 'title' ? false : true,
        includeBase64: false,
        mediaType: 'photo',
      }).then((images) => {
        console.log(images);
        if (type === 'title') {
          if (images.mime === 'image/jpeg' || images.mime === 'image/png') {
            if (
              Platform.OS === 'ios' &&
              (images.filename.endsWith('.heic') ||
                images.filename.endsWith('.HEIC'))
            ) {
              addListObj.title_logo_image = {
                name: changeIOSImageName(images.filename),
                type: images.mime,
                uri: images.path,
                size: images.size,
              };
              setTitlePics([
                {
                  name: changeIOSImageName(images.filename),
                  type: images.mime,
                  uri: images.path,
                  size: images.size,
                },
              ]);
            } else {
              addListObj.title_logo_image = {
                name: images.filename,
                type: images.mime,
                uri: images.sourceURL,
                size: images.size,
              };
              setTitlePics([
                {
                  name: images.filename,
                  type: images.mime,
                  uri: images.sourceURL,
                  size: images.size,
                },
              ]);
            }
          } else {
            Alert.alert(
              'Please note',
              'Only PNG ,JPG and JPEG images are supported. Choose another one',
            );
          }
        } else {
          let newImages = images?.map((item) => {
            if (
              Platform.OS === 'ios' &&
              (item.filename.endsWith('.heic') ||
                item.filename.endsWith('.HEIC'))
            ) {
              return {
                name: changeIOSImageName(item.filename),
                type: item.mime,
                uri: item.path,
                size: item.size,
              };
            }
            return {
              name: item.filename,
              type: item.mime,
              uri: item.sourceURL,
              size: item.size,
            };
          });
          addListObj.featured_images = newImages;
          setFeaturedPics(newImages);
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err);
    }
  };

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      <DropDown
        data={isListFeatured}
        getVal={(val) => {
          console.log('isListFeatured', val.value);
          addListObj.is_listing_featured = val.value;
        }}
        label={I18n.t('is_lisitng_featured')}
      />
      <Spacer />
      <View style={styles.body}>
        <Input
          value={seoId}
          onChangeText={(text) => {
            setSeoId(text);
            addListObj.listing_id = text;
          }}
          placeholder={I18n.t('seo_id')}
        />
        <Text style={styles.requiredText}>Obligatoire*</Text>
        <Input
          placeholder={I18n.t('title')}
          value={titleText}
          onChangeText={(text) => {
            setTitleText(text);
            addListObj.title = text;
          }}
          reference={titleRef}
          onSubmitEditing={() => descRef.current.focus()}
          returnKeyType={'next'}
        />
        <Text style={styles.requiredText}>Obligatoire*</Text>
        <Input
          placeholder={I18n.t('description')}
          reference={descRef}
          value={desc}
          onChangeText={(text) => {
            setDesc(text);
            addListObj.description = text;
          }}
          multiline
          onSubmitEditing={() => extractRef.current.focus()}
          returnKeyType={'next'}
        />
        <Text style={styles.requiredText}>Obligatoire*</Text>
        <Input
          placeholder={I18n.t('extract')}
          reference={extractRef}
          multiline
          value={excerpt}
          onChangeText={(text) => {
            setExcerpt(text);
            addListObj.excerpt = text;
          }}
          returnKeyType={'default'}
        />
        <Text style={styles.requiredText}>Obligatoire*</Text>
        <DropDown
          zIndex={9}
          withMargin={false}
          data={priceRange}
          label={I18n.t('price_range')}
          getVal={(val) => {
            console.log('Price Range', val.value);
            addListObj.price_range = val.value;
          }}
        />
        <Spacer />
        <Spacer />
        <UploadCard
          onPress={() => onPhotoPress('title')}
          title={I18n.t('title_image')}
          label={I18n.t('upload')}
        />
        <Spacer />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          bounces={false}
          extraData={titlePics}
          data={titlePics}
          renderItem={renderImage}
          keyExtractor={(item, index) => item + index.toString()}
        />
        <Spacer />
        <UploadCard
          onPress={() => onPhotoPress('featured')}
          title={I18n.t('main_picture')}
          label={I18n.t('upload')}
        />
        <Spacer />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={featuredPics}
          renderItem={renderImage}
          keyExtractor={(item, index) => item + index.toString()}
        />
        <Spacer />
      </View>
      <Spacer />
      <Spacer />
    </Accordion>
  );
};

const styles = StyleSheet.create({
  body: {
    marginHorizontal: WP('5.5'),
  },
  image: {
    width: WP('20'),
    height: HP('11'),
    marginRight: WP('5'),
    borderRadius: 5,
  },
  requiredText: {
    textAlign: 'right',
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxtiny,
    bottom: HP('1.5'),
  },
});

export {GenInfoAccord};
