import {task} from 'folktale/concurrency/task'

export const setItem = (key, value) => new Promise((resolve, reject) => {
  window.localStorage.setItem(key, value);
  resolver.resolve();
}) 

export const getItem = key => new Promise((resolve, reject) => {
  resolve(window.localStorage.getItem(key));
});


export const removeItem = key => new Promise((resolve, reject) => {
  window.localStorage.removeItem(key);
  resolve();
})
