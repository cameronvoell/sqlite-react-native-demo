/*Screen to delete the user*/
import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import MyTextInput from './components/MyTextInput';
import MyButton from './components/MyButton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
    };
  }
  deleteUser = () => {
    var that = this;
    const { input_user_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [input_user_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid User Id');
          }
        }
      );
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <MyTextInput
          placeholder="Enter User Id"
          onChangeText={input_user_id => this.setState({ input_user_id })}
          style={{ padding:10 }}
        />
        <MyButton
          title="Delete User"
          customClick={this.deleteUser.bind(this)}
        />
      </View>
    );
  }
}