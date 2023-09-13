import {create} from 'zustand'
import axios from 'axios'

type EditedContent = {
    title : string,
    body : string,
    id : number
}

type State = {
    editedContent : EditedContent
    updateEditedContent : (payload: EditedContent) => void
    resetEditedContent : () => void
}

type Bool = {
    isValid: boolean;
    toggleValid: (payload : boolean) => void;
}

const useStore = create<State>((set) => ({
    editedContent: {title : 'タイトル', body : 'コンテンツ', id : 0},
    updateEditedContent: (payload) =>
        set({
            editedContent: payload,
        }),
    resetEditedContent : () => set({editedContent:{title : 'タイトル', body : 'コンテンツ', id : 0}}),
}))

export const useBooleanState = create<Bool>((set) => ({
    isValid: false, // 初期値を設定
    toggleValid: (payload) => set({isValid : payload})
  }));

export default useStore