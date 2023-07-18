import { defineStore } from "pinia";
import { doc, getDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

interface Achievement {
    titleDate: string;
    title: string;
    titleDescription: string;
}

interface ProfileStoreState {
    openModal: boolean;
    userId: string | null;
    achievements: Achievement[];
}

export const useProfileStore = defineStore("profileStore", {
    state: (): ProfileStoreState => ({
        openModal: false,
        userId: localStorage.getItem("userId"),
        achievements: [],
    }),
    actions: {
        async getAchievement(): Promise<void> {
            const db = useFirestore();
            const docSnap = await getDoc(doc(db, "users", this.userId));
            if (docSnap.exists()) {
                this.achievements = docSnap.data().achievementList || [];
                this.achievements.sort(
                    (asc, desc) =>
                        new Date(asc.titleDate) - new Date(desc.titleDate)
                );
            }
        },
    },
});