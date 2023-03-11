import { defineStore } from 'pinia'

interface userInfo {
  user_id: number,
  user_name: string,
  nickname: string,
  budget: number,
  bill_count: number,
  time: string,
  register_timestamp: string,
  avatar: string,
  customMatter: string,
  inputClassify: string,
  outputClassify: string
}

export const useloginStore = defineStore({
  id: 'login', // id必填，且需要唯一
  state: () => {
    return {
      info: {} as userInfo, // 用户信息 , 包含 token
      userID: uni.getStorageSync('userID') ? Number(uni.getStorageSync('userID')) : -1,
      avatar: uni.getStorageSync('avatar') ? uni.getStorageSync('avatar') : '',
    }
  },
  // actions 用来修改 state
  actions: {
    login(userID: number) {
      uni.setStorageSync('userID', userID)
      this.userID = userID
    },
    setInfo(info: userInfo) {
      this.info = { ...info }
      uni.setStorageSync('info', this.info)
    },
    setInfoName(name: string) {
      this.info.nickname = name
    },
    setInfoBudget(budget: number) {
      this.info.budget = budget
    },
    setInfoBillCount(count: number) {
      this.info.bill_count = count
    },
    setInfoCustomMatter(matter: string) {
      this.info.customMatter = matter
    },
    logout() {
      uni.clearStorage()
      this.userID = -1
    },
    setAvatar(avatar: string) {
      uni.setStorageSync('avatar', avatar)
      this.avatar = avatar
    }
  }
})


