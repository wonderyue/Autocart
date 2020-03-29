export function asynActionWithToken(thunkAction) {
  return {
    request: thunkAction
  };
}

export function addPrefix(prefix, str) {
  return prefix + "@" + str;
}

export function trimPrefix(prefix, str) {
  return str.replace(prefix + "@", "");
}
