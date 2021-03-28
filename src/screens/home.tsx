import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo, useReducer} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
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

export const HomeScreen = () => {
  const [state, dispatch] = useReducer(searchReducer, searchInitialState);
  const navigation = useNavigation();

  const handleSearch = useCallback((value) => {
    dispatch(searchRequest());
    search(value)
      .then((items) => dispatch(searchSuccess(items)))
      .catch((error) => dispatch(searchFailure(error)));
  }, []);

  const content = useMemo(() => {
    if (state.isLoading) {
      return <ActivityIndicator style={styles.loading} />;
    }
    if (state.error) {
      return <Text style={styles.error}>Oops, something went wrong!</Text>;
    }
    return state.items.map((item) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate(ROUTES.Details, {id: item.id})}>
        <BusinessItem business={item} />
      </TouchableOpacity>
    ));
  }, [state.isLoading, state.items.length, state.error]);

  return (
    <View style={styles.root}>
      <SearchInput onSearch={handleSearch} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.root}>
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
});
