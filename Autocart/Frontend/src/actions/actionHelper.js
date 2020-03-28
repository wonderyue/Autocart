export function asynActionWithToken(thunkAction) {
  return {
    request: thunkAction
  };
}
