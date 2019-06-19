/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import MyTextInput from './components/MyTextInput';
import MyButton from './components/MyButton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_contact: '',
      user_address: '',
    };
  }
  register_user = () => {
    var that = this;
    const { user_name } = this.state;
    const { user_contact } = this.state;
    const { user_address } = this.state;
    //alert(user_name, user_contact, user_address);
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
              [user_name, user_contact, user_address],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });
        } else {
          alert('Please fill Address');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill Name');
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <MyTextInput
              placeholder="Enter Name"
              onChangeText={user_name => this.setState({ user_name })}
              style={{ padding:10 }}
            />
            <MyTextInput
              placeholder="Enter Contact No"
              onChangeText={user_contact => this.setState({ user_contact })}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding:10 }}
            />
            <MyTextInput
              placeholder="Enter Address"
              onChangeText={user_address => this.setState({ user_address })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top',padding:10 }}
            />
            <MyButton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}