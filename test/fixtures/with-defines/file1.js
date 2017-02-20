define('file1', ['file2'], function(file2) {
  return function(e) {
    file2(e);
  }
})