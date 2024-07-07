import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from "react-native";
import { FAB, Portal, Provider, Snackbar as RNPaperSnackBar } from "react-native-paper";
import Snackbar from "react-native-snackbar";
import SlidingUpPanel from "rn-sliding-up-panel";

import { TasksContext } from "@/src/navigation/TaskProvider";
import { ThemeContext } from "@/src/navigation/ThemeProvider";
import BottomSheet from "@/src/screens/TaskList/Components/BottomSheet";
import FullCard from "@/src/screens/TaskList/Components/FullCard";
import AppBar from "@/src/screens/TaskList/Components/Header";
import TaskCard from "@/src/screens/TaskList/Components/TaskCard";
import { SCREENS } from "@/src/utils/constants";
import { deleteTask, getAllTasks } from "@/src/utils/helper";
import { NavigationType, SortingType, SortModeType, TaskItemType, TaskListDisplayType } from "@/src/utils/types";

const TasksList = ({ navigation }: { navigation: NavigationType }) => {
    const [refreshing, setRefreshing] = useState(true);
    const [sorting, setSorting] = useState<SortingType>({
        sortMode: "createdAt", sortOrder: "descending"
    });
    const [completedFilter, setCompletedFilter] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState(-1);
    const [displayMode, setDisplayMode] = useState<TaskListDisplayType>("compact");
    const [isSnackbarvisible, setIsSnackbarVisible] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState('');

    const slidingUpPanelRef = useRef<SlidingUpPanel>(null);

    const { theme } = useContext(ThemeContext);
    const { tasks, setTasks } = useContext(TasksContext)

    const sortComparator = (a: TaskItemType, b: TaskItemType, { sortMode, sortOrder }: SortingType) => {
        switch (sortMode) {
            case 'createdAt':
                const dateAForCreatedAt = moment(a.createdAt)
                const dateBForCreatedAt = moment(b.createdAt)
                return sortOrder === 'ascending' ? dateBForCreatedAt - dateAForCreatedAt : dateAForCreatedAt - dateBForCreatedAt
            case 'taskTime':
                const dateAForTaskTime = moment(a.taskTime)
                const dateBForTaskTime = moment(b.taskTime)
                return sortOrder === 'ascending' ? dateBForTaskTime - dateAForTaskTime : dateAForTaskTime - dateBForTaskTime
            case 'priorityIs':
                return sortOrder === 'ascending' ? a.priorityIs - b.priorityIs : b.priorityIs - a.priorityIs
            default:
                return 0
        }
    }

    const getTasks = async () => {
        let list = await getAllTasks();
        list = list.sort((a, b) => sortComparator(a, b, sorting))
        setTasks(list);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        Snackbar.show({ text: "Fetching latest tasks" })
        setSorting({ sortMode: "createdAt", sortOrder: "descending" })
        await getTasks();
        setRefreshing(false);
    };

    const handleSorting = (sortMode: SortModeType) => {
        if (tasks) {
            const newSorting: SortingType = {
                sortMode,
                sortOrder: sorting.sortOrder === "ascending" ? "descending" : "ascending",
            }
            setTasks(tasks.sort((a, b) => sortComparator(a, b, newSorting)))
            setSorting(newSorting);
        }
    };

    const handleCompletedFilter = () => {
        setCompletedFilter(!completedFilter);
    };

    const handlePriorityFilter = (priority: number) => {
        if (priorityFilter === priority) {
            setPriorityFilter(-1)
        } else {
            setPriorityFilter(priority);
        }
    };

    const onToggleSnackBar = () => setIsSnackbarVisible(true);

    const onDismissSnackBar = () => {
        setIsSnackbarVisible(false);
        setDeleteTaskId("");
    };

    const handleSetTaskId = (taskId: string) => setDeleteTaskId(taskId);

    const handleDeleteTask = async () => {
        if (deleteTaskId !== "") {
            setRefreshing(true);
            const tasksResponse = await deleteTask(deleteTaskId);
            if (tasksResponse) {
                navigation.navigate(SCREENS.YOUR_TASKS);
                setDeleteTaskId("");
                setTasks(tasksResponse.sort((a, b) => sortComparator(a, b, sorting)))
            }
            setRefreshing(false);
        }
    };

    const handleDisplayMode = (value: TaskListDisplayType) => setDisplayMode(value);

    const handleSlider = () => {
        slidingUpPanelRef.current?.show({ toValue: 210, velocity: 0.8 })
    }

    const getInitalData = async () => {
        setRefreshing(true);
        await getTasks();
        setRefreshing(false);
    }

    const shouldNotShowCard = (item: TaskItemType) => {
        if (completedFilter && !item.isCompleted) {
            return true;
        }
        if (priorityFilter !== -1 && priorityFilter !== item.priorityIs) {
            return true;
        }
        return false;
    }

    const renderTaskCard = ({ item }: { item: TaskItemType }) => {
        if (shouldNotShowCard(item)) {
            return null;
        }
        return (
            <TaskCard
                navigation={navigation}
                taskItem={item}
                onToggleSnackBar={onToggleSnackBar}
                handleSetTaskId={handleSetTaskId}
                onDismissSnackBar={onDismissSnackBar} />
        );
    };

    const renderFullCard = ({ item }: { item: TaskItemType }) => {
        if (shouldNotShowCard(item)) {
            return null;
        }
        return (
            <FullCard
                navigation={navigation}
                taskItem={item}
                onToggleSnackBar={onToggleSnackBar}
                handleSetTaskId={handleSetTaskId}
                onDismissSnackBar={onDismissSnackBar} />
        );
    };

    useEffect(() => {
        navigation.addListener('focus', getInitalData)
        return () => {
            navigation.removeListener('focus', getInitalData)
        }
    }, [navigation])

    return (
        <Provider>
            <AppBar
                navigation={navigation}
                handleSlider={handleSlider}
            />
            <View
                style={[
                    styles.flatListContainer,
                    { backgroundColor: theme?.backgroundColor },
                ]}
            >
                <FlatList
                    removeClippedSubviews={true}
                    data={tasks}
                    extraData={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={displayMode === "fullcard"
                        ? renderFullCard
                        : renderTaskCard
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["white"]}
                            progressBackgroundColor={theme?.colorAccentSecondary}
                        />
                    }
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, color: theme?.subTextColor }}>Add a task</Text>
                        </View>
                    }
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>
            <FAB
                style={[
                    styles.fab,
                    { backgroundColor: theme?.colorAccentSecondary },
                ]}
                icon="plus"
                color={theme?.chipColor}
                onPress={() => navigation.navigate(SCREENS.ADD_TASK)}
            />
            <Portal>
                <BottomSheet
                    sorting={sorting}
                    completedFilter={completedFilter}
                    prioFilter={priorityFilter}
                    handleRef={slidingUpPanelRef}
                    displayMode={displayMode}
                    handleSorting={handleSorting}
                    handleCompletedFilter={handleCompletedFilter}
                    handlePriorityFilter={handlePriorityFilter}
                    handleDisplayMode={handleDisplayMode}
                />
                <RNPaperSnackBar
                    visible={isSnackbarvisible}
                    onDismiss={onDismissSnackBar}
                    duration={3000}
                    action={{
                        label: "Delete Task",
                        onPress: handleDeleteTask,
                        textColor: theme?.chipColor
                    }}
                    style={{ backgroundColor: theme?.colorAccentPrimary }}
                    theme={{ colors: { accent: "white" } }}
                >
                    Task Completed
                </RNPaperSnackBar>
            </Portal>
        </Provider>
    );
};

export default TasksList;

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        paddingVertical: 5,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
