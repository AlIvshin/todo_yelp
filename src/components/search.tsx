import React, {useCallback} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

type PropTypes = {
  onSearch: () => any;
  onChangeText: (value: string) => any;
};

export const SearchInput = ({onSearch, onChangeText}: PropTypes) => {
  const onUpdateValue = useCallback((value: string) => {
    onChangeText(value);
  }, []);
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        onChangeText={onUpdateValue}
        placeholder="Search"
      />
      <Button title="Search" onPress={() => onSearch()} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  searchInput: {
    flexGrow: 1,
    flex: 1,
  },
});
