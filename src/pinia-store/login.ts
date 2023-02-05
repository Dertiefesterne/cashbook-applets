import { defineStore } from 'pinia'

interface userInfo {
  user_id: Number,
  user_name: String,
  nickname: String,
  budget: Number,
  bill_count: Number,
  time: String,
  register_timestamp: String,
  avatar: String
}



export const useloginStore = defineStore({
  id: 'login', // id必填，且需要唯一
  state: () => {
    return {
      info: {} as userInfo, // 用户信息 , 包含 token
      userID: uni.getStorageSync('userID') ? uni.getStorageSync('userID') : -1
    }
  },
  // actions 用来修改 state
  actions: {
    login(userID: Number) {
      uni.setStorageSync('userID', userID)
      this.userID = userID
    },
    setInfo(info: userInfo) {
      uni.setStorageSync('info', info)
      this.info = info
      // this.userID = userID
    },
    logout() {
      uni.clearStorage()
      this.userID = -1
    }
  }
})
