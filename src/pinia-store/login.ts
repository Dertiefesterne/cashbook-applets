import { defineStore } from 'pinia'

export const useloginStore = defineStore({
  id: 'login', // id必填，且需要唯一
  state: () => {
    return {
      info: {}, // 用户信息 , 包含 token
      userID: uni.getStorageSync('userID') ? uni.getStorageSync('userID') : -1
    }
  },
  // actions 用来修改 state
  actions: {
    login(userID: number) {
      uni.setStorageSync('userID', userID)
      this.userID = userID
    },
    logout() {
      uni.clearStorage()
      this.userID = -1
    }
  }
})
