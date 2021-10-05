import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Platform} from 'react-native';
import {Accordion, Spacer, UploadCard} from '../../components';
import I18n from '../../translation';
import {WP, HP} from '../../utilities';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

const GallerySecAcord = ({title, expanded, onToggle}) => {
  const [gallaryPics, setGalleryPics] = useState([]);

  const {addListObj} = useSelector((state) => state.listings);

  //set already filled values
  useEffect(() => {
    setGalleryPics(addListObj.gallery_images);
  }, [addListObj]);

  const renderImage = ({item, index}) => (
    <Image key={index} source={{uri: item.uri}} style={styles.image} />
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
        multiple: true,
        mediaType: 'photo',
        includeBase64: false,
      }).then((images) => {
        console.log(images);
        let newImages = images?.map((item) => {
          if (
            Platform.OS === 'ios' &&
            (item.filename.endsWith('.heic') || item.filename.endsWith('.HEIC'))
          ) {
            return {
              name: changeIOSImageName(item.filename),
              type: item.mime,
              uri: item.path,
              size: item.size,
            };
          } else {
            return {
              name: item.filename,
              type: item.mime,
              uri: item.sourceURL,
              size: item.size,
            };
          }
        });
        addListObj.gallery_images = newImages;
        setGalleryPics(newImages);
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      <View style={styles.body}>
        <UploadCard
          onPress={onPhotoPress}
          title={I18n.t('gallery_images')}
          label={I18n.t('upload')}
        />
        <Spacer />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={gallaryPics}
          renderItem={renderImage}
          keyExtractor={(item, index) => item + index.toString()}
        />
        <Spacer />
      </View>
    </Accordion>
  );
};

const styles = StyleSheet.create({
  body: {
    marginHorizontal: WP('5.5'),
  },
  image: {
    width: WP('34'),
    height: HP('15'),
    marginRight: WP('5'),
    borderRadius: 5,
  },
});

export {GallerySecAcord};
