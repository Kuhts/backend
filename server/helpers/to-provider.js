
module.exports = {
  twitter,
  google,
  facebook,
  github,
}

function twitter(user) {
  const {
    id,
    username,
    photos,
  } = user
  // console.log(user)
  return {
    key: id,
    provider: 'twitter',
    name: username,
    photo: photos[0].value.replace(/_normal/, ''),
  }
}

function google (user) {
  const {
    id,
    displayName,
    photos,
  } = user
  // console.log(user)
  return {
    key: id,
    provider: 'google',
    name: displayName,
    photo: photos[0].value.replace(/sz=50/gi, 'sz=250'),
  }
}

function facebook (user) {
  const {
    name,
    photos,
    id,
  } = user
  const {
    givenName,
    familyName,
  } = name
  // console.log(user)
  return {
    key: id,
    provider: 'facebook',
    name: `${givenName} ${familyName}`,
    photo: photos[0].value,
  }
}

function github (user) {
  const {
    id,
    username,
    photos,
  } = user
  // console.log(user)
  return {
    key: id,
    provider: 'github',
    name: username,
    photo: photos[0].value,
  }
}
