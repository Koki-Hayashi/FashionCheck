import firebase from './firebaseSetting';

/*
* This method returns a promise wrapping json of the user data if found, otherwise return a promise wrapping empty object.
*/
export function find(userId) {
  console.log('finding user:', userId);
  return firebase.database().ref('/users/' + userId).once('value').then((result) => {
    const userObj = result.val();


    console.log('found :' +  userObj);
	return userObj ? userObj : {};
  }).catch(error => {
    console.log('error occurred while finding user:' + userId);
    return {}
  })
}

/*
 * This method returns a promise wrapping a boolean result according to the user existence.
 */
export function exist(userId) {
  return find(userId).then((userObj) => {

    return (userObj.userId);
  });
}

/*
* userObj expects something like below.
*
* {'name' : 'Koki', 'email': 'koki@vm.com' }
*
*/
export function persist(userId, userObj) {
  console.log('persisting user:', userId);
  console.log('value', userObj);
  firebase.database().ref('users/' + userId).set(userObj);
}

/*
 * updateParam expects something like below
 * {name: 'updated'}
 */

export function update(userId, updateParam){
  console.log('updating user:', userId);
  console.log('value', updateParam);
  return firebase.database().ref('users/' + userId).update(updateParam);
}

/*
* callback should be function which takes new user object from firebase
* (userObj) => {console.log(userObj)}
 */
export function setListenerOnUser(userId, callback) {
  firebase.database().ref('/users/' + userId).on('value', callback);
}

export function remove(userId) {
  console.log('deleting user:', userId);
  firebase.database().ref('users/' + userId).remove();
}




