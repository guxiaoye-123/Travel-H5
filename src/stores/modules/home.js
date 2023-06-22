import { defineStore } from "pinia";
import { getHomeHotSuggests,getHomeCategories,getHomeHouselist } from "@/services/index"
const useHomeStore = defineStore("home", {
    state: () => ({
        hostSuggests: [],
        categories: [],
        currentPage: 1,
        houselist: []
    }),

    actions: {
        async fetchHostSuggestData() {
            const res = await getHomeHotSuggests()
            this.hostSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouselistData() {
            const res = await getHomeHouselist(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})


export default useHomeStore