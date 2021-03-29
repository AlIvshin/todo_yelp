import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {fonts} from '../styles';

type PropTypes = {
  business: Business;
};

export const BusinessItem = ({business}: PropTypes) => {
  return (
    <View style={styles.root}>
      <FastImage
        style={styles.image}
        source={{
          uri: business.image_url,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.description}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.info}>Rating: {business.rating}</Text>
        <Text style={styles.info}>Reviews: {business.review_count}</Text>
        <Text style={styles.info}>Price: {business.price || '-'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 8,
  },
  description: {},
  image: {width: 64, height: 64},
  name: {
    ...fonts.h6,
    marginHorizontal: 16,
    paddingBottom: 8,
  },
  info: {...fonts.subtitle, paddingHorizontal: 16},
});
