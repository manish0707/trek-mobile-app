import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './SelectModal.styles';
import {images} from '../../images';

export default function SelectModal({
  list = [],
  placeholder,
  modalHeading,
  onSelect,
  selectedValue,
  enableSearch = true,
  style,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [listData, setListData] = useState(list);

  const handleClick = () => {
    setIsVisible(true);
  };
  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      setListData(list);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!searchText || !list) return;

    setListData(
      list.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);

  const onChangeText = value => setSearchText(value);

  const handleSelect = value => {
    if (typeof onSelect === 'function') {
      onSelect(value);
    }
    setIsVisible(false);
  };

  return (
    <View style={style}>
      <TouchableOpacity style={styles.field} onPress={handleClick}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.fieldText}>
          {selectedValue || placeholder}
        </Text>
        <Image style={styles.downImage} source={images.downArrow} />
      </TouchableOpacity>
      <Modal avoidKeyboard isVisible={isVisible} onBackdropPress={handleClose}>
        <View style={styles.modalWrap}>
          <FlatList
            keyboardShouldPersistTaps="always"
            data={listData}
            ListHeaderComponent={
              <>
                <Text style={styles.heading}>{modalHeading}</Text>
                {enableSearch ? (
                  <TextInput
                    onChangeText={onChangeText}
                    placeholder="Search"
                    style={styles.searchInput}
                    placeholderTextColor="gray"
                  />
                ) : null}
              </>
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.selectOption}>
                <Text style={styles.selectText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={({code}) => code}
          />
        </View>
      </Modal>
    </View>
  );
}
