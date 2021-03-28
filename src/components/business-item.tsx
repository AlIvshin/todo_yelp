import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type PropTypes = {
  business: Business;
};

export const BusinessItem = ({business}: PropTypes) => {
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{uri: business.image_url}} />
      <View style={styles.description}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.rating}>Rating: {business.rating}</Text>
        <Text style={styles.reviewCount}>Reviews: {business.review_count}</Text>
        <Text style={styles.price}>Price: {business.price || '-'}</Text>
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
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 16,
    paddingBottom: 8,
  },
  price: {paddingHorizontal: 16},
  rating: {paddingHorizontal: 16},
  reviewCount: {paddingHorizontal: 16},
});
