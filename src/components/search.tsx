import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

type PropTypes = {
  onSearch: (value: string) => any;
};

export const SearchInput = ({onSearch}: PropTypes) => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        onChangeText={setValue}
        placeholder="Search"
      />
      <Button title="Search" onPress={() => onSearch(value)} />
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
