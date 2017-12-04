import firebase from './firebaseSetting';
import judgeEnum from '../pages/judge/judgeEnum';

/*
* This method returns a promise wrapping the image URL, otherwise will return a empty string
*/
export function saveImage(results, categoryId, userId) {
	var photoId = String(Math.random()).split('.')[1]
	const photoObject = {
		id: photoId,
		userId: userId,
		base64: results.base64,
		categoryId: categoryId,
		positiveLabel: 0,
		negativeLabel: 0,
		timeStamp: Date.now()
	}

	firebase.database().ref('photos/' + photoId).set(photoObject);
}


/*
 * This method returns a promise wrapping the image URL, otherwise will return a empty string
 */
export function getPhotoObjectByUserId(userId) {
	return firebase.database().ref('photos/').orderByChild('userId').equalTo(userId).once('value').then((result) => {

		const photoObj = result.val();

	  const photoObjects = []
		for (const photo in photoObj) {
			photoObjects.push(photoObj[photo])
		}
		return photoObjects ? photoObjects : [];
		// console.log(result.val())
	})
}

export function getPhotoObjectsByCategoryId(categoryId, userId) {

	return firebase.database().ref('photos/').orderByChild('categoryId').equalTo(categoryId).once('value').then((result) => {

		const photoObj = result.val();

	  const photoObjects = []

		for (const photo in photoObj) {

			if (photoObj[photo].userId !== userId) {

				photoObjects.push(photoObj[photo])
			}

		}


		return photoObjects ? photoObjects : [];
	})
}

export function findPhotoObject(photoId) {
	return firebase.database().ref('/photos/' + photoId).once('value').then((result) => {
		const userObj = result.val();

		return userObj ? userObj : {};
	}).catch(error => {
		console.log('error occurred while finding photo:' + photoId);
		return {}
	})
}


export function persistPhoto(photoId, photoObj) {
	console.log('persisting photo:', photoId);
	console.log('value', photoObj);
	firebase.database().ref('photos/' + photoId).set(photoObj);
}



export function judgePhoto(photoId, passedJudgeEnum) {
	console.log("judging photo " + photoId + ". Judge enum2: ", passedJudgeEnum.id);
	console.log(judgeEnum.yes.id);
	try {
		return firebase.database().ref('/photos/' + photoId).transaction(function (post) {
			if (post) {
				switch (passedJudgeEnum.id) {
					case judgeEnum.yes.id:
						console.log("yes " + photoId);
						post.positiveLabel++;
						break;
					case judgeEnum.no.id:
						console.log("no " + photoId);
						post.negativeLabel++;
						break;
					case judgeEnum.maybe.id:
						console.log("maybe updated" + photoId);
						post.maybeLabel++;
						break;
					default:
						console.log("Error: wtf kinda of judgeEnum did you pass in ");
				}
			} else {
				console.log("Error: the googles ze do nothing so no data was uploaded. post[null]");
			}
			return post;
		});
	} catch (e) {
		console.log('error ' + e)
	}
}
//
//
// function toggleStar(phi, uid) {
// 	return firebase.database().ref('/users/' + userId).transaction(function(post) {
// 		if (post) {
// 			if (post.stars && post.stars[uid]) {
// 				post.starCount--;
// 				post.stars[uid] = null;
// 			} else {
// 				post.starCount++;
// 				if (!post.stars) {
// 					post.stars = {};
// 				}
// 				post.stars[uid] = true;
// 			}
// 		}
// 		return post;
// 	});
// }


