const MyCompnent = {
  Cmp1: () => {
    return import('./cmp1');
  },
  Cmp2: () => {
    return import('./cmp2');
  }
}

export default MyCompnent;