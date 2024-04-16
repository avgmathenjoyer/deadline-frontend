import { create } from "zustand";
import { Deadline } from "./utils";
import { immer } from "zustand/middleware/immer";

export type DeadlineState = {
    deadlines: Deadline[],
}

type DeadlineActions = {
    updateDeadline: (id: number, newName: string, newDescription: string, newDate: Date) => void
    deleteDeadline: (id: number) => void;
    createDeadline: (id: number, name: string, description: string, date: Date) => void;
    setDeadlines: (deadlines: Deadline[]) => void;
}





export const useDeadlineStore = create<DeadlineState & DeadlineActions>()(
    immer((set) => ({
        deadlines: [],
        updateDeadline: (id: number, newName: string, newDescription: string, newDate: Date) => set((state) => {
            const index = state.deadlines.findIndex((deadline: Deadline) => deadline.id === id);
            if (index !== -1) {
                state.deadlines[index].title = newName;
                state.deadlines[index].description = newDescription;
                state.deadlines[index].endDate = newDate;
            }
        }),
        setDeadlines: (deadlines: Deadline[]) => set((state) => {
            state.deadlines = deadlines;
        }),
        createDeadline: (id: number, title: string, description: string, date: Date) => set((state) => {
            const newDeadline: Deadline = {
                id: id,
                title: title,
                description: description,
                endDate: date
            }
            state.deadlines.push(newDeadline);
        }),
        deleteDeadline: (id: number) => set((state) => {
            const index = state.deadlines.findIndex((deadline: Deadline) => deadline.id === id);
            if (index !== -1) {
                state.deadlines.splice(index, 1);
            }
        })
    }))
)
