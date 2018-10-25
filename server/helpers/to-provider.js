
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
  return {
    key: id,
    provider: 'twitter',
    name: username,
    image: photos[0].value.replace(/_normal/, ''),
  }
}

function google (user) {
  const {
    id,
    displayName,
    photos,
  } = user
  return {
    key: id,
    provider: 'google',
    name: displayName,
    image: photos[0].value.replace(/sz=50/gi, 'sz=250'),
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
  return {
    key: id,
    provider: 'facebook',
    name: `${givenName} ${familyName}`,
    image: photos[0].value,
  }
}

function github (user) {
  const {
    id,
    username,
    photos,
  } = user
  return {
    key: id,
    provider: 'github',
    name: username,
    image: photos[0].value,
  }
}
