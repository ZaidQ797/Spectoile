import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Accordion, Spacer, Input} from '../../components';
import I18n from '../../translation';
import {WP, HP, family, size} from '../../utilities';
import {useSelector} from 'react-redux';

const SocialAcord = ({title, expanded, onToggle}) => {
  const facebookRef = useRef();
  const twitterRef = useRef();
  const instgramRef = useRef();
  const tripAdRef = useRef();
  const youtubeRef = useRef();
  const googleRef = useRef();
  const pintrestRef = useRef();
  const yelpRef = useRef();

  const [facebook, setFacebook] = useState('');
  const [twiiter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tripadvisor, setTripadvisor] = useState('');
  const [youTube, setYouTube] = useState('');
  const [googlePlus, setGooglePlus] = useState('');
  const [pinterest, setPinterest] = useState('');
  const [yelp, setYelp] = useState('');

  const {addListObj} = useSelector((state) => state.listings);

  useEffect(() => {
    setFacebook(addListObj.facebook);
    setTwitter(addListObj.twiiter);
    setInstagram(addListObj.instagram);
    setTripadvisor(addListObj.tripadvisor);
    setYouTube(addListObj.youtube);
    setGooglePlus(addListObj.google_plus);
    setPinterest(addListObj.pinterest);
    setYelp(addListObj.yelp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <View style={styles.body}>
        <Spacer />
        <Input
          placeholder={I18n.t('facebook_link')}
          reference={facebookRef}
          onSubmitEditing={() => twitterRef.current.focus()}
          returnKeyType={'next'}
          value={facebook}
          onChangeText={(text) => {
            setFacebook(text);
            addListObj.facebook = text;
          }}
        />
        <Input
          placeholder={I18n.t('twiiter_link')}
          reference={twitterRef}
          onSubmitEditing={() => instgramRef.current.focus()}
          returnKeyType={'next'}
          value={twiiter}
          onChangeText={(text) => {
            setTwitter(text);
            addListObj.twiiter = text;
          }}
        />
        <Input
          placeholder={I18n.t('instagram_link')}
          reference={instgramRef}
          onSubmitEditing={() => tripAdRef.current.focus()}
          returnKeyType={'next'}
          value={instagram}
          onChangeText={(text) => {
            setInstagram(text);
            addListObj.instagram = text;
          }}
        />
        <Input
          placeholder={I18n.t('tripadvisor_link')}
          reference={tripAdRef}
          onSubmitEditing={() => youtubeRef.current.focus()}
          returnKeyType={'next'}
          value={tripadvisor}
          onChangeText={(text) => {
            setTripadvisor(text);
            addListObj.tripadvisor = text;
          }}
        />
        <Input
          placeholder={I18n.t('youTube_link')}
          reference={youtubeRef}
          onSubmitEditing={() => googleRef.current.focus()}
          returnKeyType={'next'}
          value={youTube}
          onChangeText={(text) => {
            setYouTube(text);
            addListObj.youTube = text;
          }}
        />
        <Input
          placeholder={I18n.t('google_link')}
          reference={googleRef}
          onSubmitEditing={() => pintrestRef.current.focus()}
          returnKeyType={'next'}
          value={googlePlus}
          onChangeText={(text) => {
            setGooglePlus(text);
            addListObj.google_plus = text;
          }}
        />
        <Input
          placeholder={I18n.t('pinterest_link')}
          reference={pintrestRef}
          onSubmitEditing={() => yelpRef.current.focus()}
          returnKeyType={'next'}
          value={pinterest}
          onChangeText={(text) => {
            setPinterest(text);
            addListObj.pinterest = text;
          }}
        />
        <Input
          placeholder={I18n.t('yelp_link')}
          reference={yelpRef}
          // onSubmitEditing={() => emailRef.current.focus()}
          returnKeyType={'default'}
          value={yelp}
          onChangeText={(text) => {
            setYelp(text);
            addListObj.yelp = text;
          }}
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
    marginBottom: WP('5'),
    borderRadius: 5,
  },
  itemCotnainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: WP('1'),
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0,
  },
  label: {
    fontFamily: family.Montserrat_Regular,
    left: 2,
    fontSize: size.tiny,
    width: WP('30'),
  },
  missingQoute: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xtiny,
    marginHorizontal: WP('2'),
  },
  mapView: {
    flex: 1,
    height: HP('40'),
    borderRadius: 5,
  },
});

export {SocialAcord};
