import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useReducer} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  detailsFailure,
  detailsInitialState,
  detailsReducer,
  detailsRequest,
  detailsSuccess,
} from '../store/details-reducer';
import {fonts} from '../styles';
import {fetchDetails} from '../utils/requests';

type RouteProps = RouteProp<RootNavigatorParamList, 'Details'>;

export const DetailsScreen = () => {
  const route = useRoute<RouteProps>();
  const [state, dispatch] = useReducer(detailsReducer, detailsInitialState);

  // Get details using 'id' provided by route params.
  useEffect(() => {
    dispatch(detailsRequest());
    fetchDetails(route.params.id)
      .then((res) => dispatch(detailsSuccess(res)))
      .catch((error) => dispatch(detailsFailure(error)));
  }, []);

  if (state.isLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (state.error || !state.details) {
    return <Text style={styles.error}>Oops, something went wrong!</Text>;
  }

  const {
    name,
    review_count,
    rating,
    price,
    photos,
    display_phone,
  } = state.details;

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.photos}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {photos.map((url) => (
              <FastImage
                style={styles.image}
                source={{
                  uri: url,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.description}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>Rating: {rating}</Text>
          <Text style={styles.info}>Reviews: {review_count}</Text>
          <Text style={styles.info}>Price: {price || '-'}</Text>
          <Text style={styles.info}>Phone: {display_phone || '-'}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loading: {padding: 16},
  photos: {height: 144, marginBottom: 16},
  description: {},
  image: {width: 128, height: 128, margin: 8},
  name: {
    ...fonts.h6,
    marginHorizontal: 16,
    paddingBottom: 8,
  },
  info: {...fonts.subtitle, paddingHorizontal: 16},
  error: {
    ...fonts.error,
    padding: 16,
  },
});
