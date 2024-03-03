import React, {useContext} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {signout} from '../../utils/auth';
import {textStyles} from '../../styles/textStyles';
import {Colors} from '../../styles/Colors';
import {constants} from '../../constants';
import {images} from '../../images';
import ExpenseCard from '../../components/ExpenseCard/ExpenseCard';

export default function Home() {
  const {user, setUser} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signout();
      setUser(null);
    } catch (e) {
      Alert.alert('ERROR', JSON.stringify(e));
    }
  };

  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
      <View>
        <Text style={[textStyles.Xlarge]}>Hello, {user.displayName}</Text>
      </View>

      <ImageBackground
        source={images.background}
        imageStyle={{borderRadius: 20}}
        style={{
          marginTop: 20,
          padding: 14,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'white'}}>Total Expense</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}>
            <Text style={{color: 'white'}}>This Month</Text>
          </TouchableOpacity>
        </View>
        <Text style={[textStyles.largeHeading, {marginVertical: 10}]}>
          {constants.RUPEES_SYMBOL}120
        </Text>
        <Text style={{color: 'white'}}>Amount for this month</Text>
      </ImageBackground>

      <View
        style={{marginTop: 30, borderWidth: 1, padding: 10, borderRadius: 20}}>
        <Text style={textStyles.Xlarge}>Categories</Text>

        <View style={{marginTop: 10}}>
          <Text style={textStyles.medium}>Food</Text>
          <View
            style={{
              height: 10,
              backgroundColor: Colors.brand,
              borderRadius: 10,
              marginTop: 4,
              width: '80%',
            }}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={textStyles.medium}>Education</Text>
          <View
            style={{
              height: 10,
              backgroundColor: Colors.brand,
              borderRadius: 10,
              marginTop: 4,
              width: '60%',
            }}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={textStyles.medium}>Entertainment</Text>
          <View
            style={{
              height: 10,
              backgroundColor: Colors.brand,
              borderRadius: 10,
              marginTop: 4,
              width: '40%',
            }}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={textStyles.medium}>Food</Text>
          <View
            style={{
              height: 10,
              backgroundColor: Colors.brand,
              borderRadius: 10,
              marginTop: 4,
              width: '20%',
            }}
          />
        </View>
      </View>

      <View style={{marginBottom: 50}}>
        <Text style={[textStyles.large, {marginTop: 30}]}>Recent Expenses</Text>
        <View>
          <ExpenseCard
            item={{
              amount: '122',
              cateogry: 'Entertainment',
              date: 'March 3, 2024',
              name: 'with some note',
              note: 'this is some note',
              userId: 'DNzaMcz4Yye3g8xQu0ntlC2gNTU2',
            }}
          />
          <ExpenseCard
            item={{
              amount: '122',
              cateogry: 'Education',
              date: 'March 3, 2024',
              name: 'with some note',
              note: 'this is some note',
              userId: 'DNzaMcz4Yye3g8xQu0ntlC2gNTU2',
            }}
          />
              <ExpenseCard
            item={{
              amount: '122',
              cateogry: 'Travel',
              date: 'March 3, 2024',
              name: 'with some note',
              note: 'this is some note',
              userId: 'DNzaMcz4Yye3g8xQu0ntlC2gNTU2',
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
