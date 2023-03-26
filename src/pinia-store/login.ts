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
      theme: uni.getStorageSync('theme') ? uni.getStorageSync('theme') : 'light',
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
      uni.setStorageSync('info', this.info)
    },
    setInfoBudget(budget: number) {
      this.info.budget = budget
      uni.setStorageSync('info', this.info)
    },
    setInfoBillCount(count: number) {
      this.info.bill_count = count
      uni.setStorageSync('info', this.info)
    },
    setInfoCustomMatter(matter: string) {
      this.info.customMatter = matter
      uni.setStorageSync('info', this.info)
    },
    setInputClassify(matter: string) {
      this.info.inputClassify = matter
      uni.setStorageSync('info', this.info)
    },
    setOutputClassify(matter: string) {
      this.info.outputClassify = matter
      uni.setStorageSync('info', this.info)
    },
    logout() {
      uni.clearStorage()
      this.userID = -1
    },
    setAvatar(avatar: string) {
      uni.setStorageSync('avatar', avatar)
      this.avatar = avatar
    },
    setTheme(theme: string) {
      uni.setStorageSync('theme', theme)
      this.theme = theme
    }
  }
})


