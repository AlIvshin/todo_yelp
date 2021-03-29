import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BusinessItem} from '../components/business-item';
import {SearchInput} from '../components/search';
import {ROUTES} from '../navigation/routes';
import {
  searchFailure,
  searchInitialState,
  searchReducer,
  searchRequest,
  searchSuccess,
} from '../store/search-reducer';
import {fonts} from '../styles';
import {search} from '../utils/requests';

export const RestaurantListScreen = () => {
  const [state, dispatch] = useReducer(searchReducer, searchInitialState);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((value) => {
    dispatch(searchRequest());
    return search(value)
      .then((items) => dispatch(searchSuccess(items)))
      .catch((error) => dispatch(searchFailure(error)));
  }, []);

  const [isRefreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleSearch(query).then(() => setRefreshing(false));
  }, []);

  const content = useMemo(() => {
    if (isRefreshing) {
      return <View />;
    }
    if (state.isLoading) {
      return <ActivityIndicator style={styles.loading} />;
    }
    if (state.error) {
      return <Text style={styles.error}>Oops, something went wrong!</Text>;
    }
    if (state.items.length === 0 && state.wasRequested) {
      return <Text style={styles.noItems}>No items found</Text>;
    }
    return state.items.map((item) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate(ROUTES.Details, {id: item.id})}>
        <BusinessItem business={item} />
      </TouchableOpacity>
    ));
  }, [state.isLoading, state.items.length, state.error, isRefreshing]);

  return (
    <View style={styles.root}>
      <SearchInput
        onSearch={() => handleSearch(query)}
        onChangeText={setQuery}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.root}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        {content}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loading: {
    padding: 16,
  },
  error: {
    ...fonts.error,
    padding: 16,
  },
  noItems: {
    ...fonts.subtitle,
    padding: 16,
  },
});
