import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
    Checkbox,
    Chip,
    RadioButton,
    TouchableRipple,
} from "react-native-paper";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SlidingUpPanel from "rn-sliding-up-panel";

import { ThemeContext } from "@/src/navigation/ThemeProvider";
import { SortingType, SortModeType, TaskListDisplayType } from "@/src/utils/types";

const initialLayout = { width: Dimensions.get("window").width };

interface Props {
    sorting: SortingType,
    completedFilter: boolean,
    prioFilter: number,
    handleRef: React.RefObject<SlidingUpPanel>,
    displayMode: string,
    handleSorting: (key: SortModeType) => void,
    handleCompletedFilter: () => void,
    handlePriorityFilter: (val: number) => void,
    handleDisplayMode: (value: TaskListDisplayType) => void
}

const BottomSheet = ({
    sorting,
    completedFilter,
    handleRef,
    prioFilter,
    displayMode,
    handleSorting,
    handleCompletedFilter,
    handlePriorityFilter,
    handleDisplayMode,
}: Props) => {
    const { theme } = useContext(ThemeContext);

    const { sortMode, sortOrder } = sorting;

    const [index, setIndex] = useState(0);

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: theme?.bottomSheet }}>
            <TouchableRipple
                style={styles.completedFilter}
                onPress={handleCompletedFilter}
            >
                <>
                    <Text
                        style={{ fontSize: 15, color: theme?.textColor }}
                    >
                        Completed
                    </Text>
                    <Checkbox
                        status={completedFilter ? "checked" : "unchecked"}
                        onPress={handleCompletedFilter}
                        color={theme?.colorAccentSecondary}
                        uncheckedColor={theme?.textColor}
                    />
                </>
            </TouchableRipple>
            <View style={styles.priorityFilters}>
                <Chip
                    selectedColor={prioFilter === 1 ? "white" : "black"}
                    style={[{
                        marginRight: 15, elevation: 1,
                    },
                    prioFilter === 1 && {
                        backgroundColor: theme?.priority.high,
                    },
                    ]}
                    icon="priority-high"
                    onPress={() => handlePriorityFilter(1)}
                    selected={prioFilter === 1 ? true : false}
                >
                    High
                </Chip>
                <Chip
                    selectedColor={prioFilter === 2 ? "white" : "black"}
                    style={[{
                        marginRight: 15, elevation: 1,
                    },
                    prioFilter === 2 && {
                        backgroundColor: theme?.priority.mid,
                    },
                    ]}
                    icon="sort"
                    onPress={() => handlePriorityFilter(2)}
                    selected={prioFilter === 2 ? true : false}
                >
                    Medium
                </Chip>
                <Chip
                    selectedColor={prioFilter === 3 ? "white" : "black"}
                    style={[{
                        marginRight: 15, elevation: 1,
                    },
                    prioFilter === 3 && {
                        backgroundColor: theme?.priority.low,
                    },
                    ]}
                    icon="priority-low"
                    onPress={() => handlePriorityFilter(3)}
                    selected={prioFilter === 3 ? true : false}
                >
                    Low
                </Chip>
            </View>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: theme?.bottomSheet }}>
            <TouchableRipple
                style={styles.setSorting}
                onPress={() => handleSorting("createdAt")}
            >
                <>
                    <Text style={{ fontSize: 15, color: theme?.textColor }}>
                        Sort by created at
                    </Text>
                    {sortMode === "createdAt" && (
                        <MaterialCommunityIcons
                            color={theme?.colorAccentSecondary}
                            name={
                                sortOrder === "ascending" ? "arrow-down" : "arrow-up"
                            }
                            size={25}
                            style={styles.sortArrow}
                        />
                    )}
                </>
            </TouchableRipple>
            <TouchableRipple
                style={styles.setSorting}
                onPress={() => handleSorting("priorityIs")}
            >
                <>
                    <Text style={{ fontSize: 15, color: theme?.textColor }}>
                        Sort by priority
                    </Text>
                    {sortMode === "priorityIs" && (
                        <MaterialCommunityIcons
                            color={theme?.colorAccentSecondary}
                            name={
                                sortOrder === "ascending" ? "arrow-down" : "arrow-up"
                            }
                            size={25}
                            style={styles.sortArrow}
                        />
                    )}
                </>
            </TouchableRipple>
            <TouchableRipple
                style={styles.setSorting}
                onPress={() => handleSorting("taskTime")}
            >
                <>
                    <Text style={{ fontSize: 15, color: theme?.textColor }}>
                        Sort by due time
                    </Text>
                    {sortMode === "taskTime" && (
                        <MaterialCommunityIcons
                            color={theme?.colorAccentSecondary}
                            name={
                                sortOrder === "ascending" ? "arrow-up" : "arrow-down"
                            }
                            size={25}
                            style={styles.sortArrow}
                        />
                    )}
                </>
            </TouchableRipple>
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: theme?.bottomSheet }}>
            <RadioButton.Group
                onValueChange={(value) => {
                    handleDisplayMode(value as TaskListDisplayType);
                }}
                value={displayMode}
            >
                <View>
                    <RadioButton.Item
                        label="Compact"
                        value="compact"
                        uncheckedColor={theme?.colorAccentSecondary}
                        color={theme?.colorAccentSecondary}
                        labelStyle={{ color: theme?.textColor }}
                        style={{ paddingHorizontal: 20 }}
                    />
                    <RadioButton.Item
                        label="Full Card"
                        value="fullcard"
                        uncheckedColor={theme?.colorAccentSecondary}
                        color={theme?.colorAccentSecondary}
                        labelStyle={{ color: theme?.textColor }}
                        style={{ paddingHorizontal: 20 }}
                    />
                </View>
            </RadioButton.Group>
        </View>
    );

    const [routes] = useState([
        { key: "first", title: "Sort" },
        { key: "second", title: "Filter" },
        { key: "third", title: "Display" },
    ]);

    const renderScene = SceneMap({
        first: SecondRoute,
        second: FirstRoute,
        third: ThirdRoute,
    });

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme?.colorAccentSecondary }}
            style={{ backgroundColor: theme?.backgroundColor }}
            labelStyle={{
                fontWeight: "bold",
                textTransform: "capitalize",
            }}
            activeColor={theme?.colorAccentSecondary}
            inactiveColor={theme?.subTextColor}
            pressColor={"rgba(31, 0, 0,0.2)"}
        />
    );

    return (
        <SlidingUpPanel
            ref={handleRef}
            draggableRange={{ top: 210, bottom: 0 }}
            snappingPoints={[0, 210]}
        >
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
        </SlidingUpPanel>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 16,
    },
    filterHeading: {
        fontWeight: "bold",
        fontSize: 15,
        paddingHorizontal: 20,
        paddingBottom: 5,
    },
    indicator: {
        backgroundColor: "rgba(0,0,0,0.75)",
        height: 5,
        width: 40,
        borderRadius: 4,
        alignSelf: "center",
        position: "absolute",
        marginTop: 7,
    },
    sortArrow: {
        paddingTop: 3,
        paddingRight: 5,
    },
    setSorting: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,

        height: 50,
    },
    completedFilter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    priorityFilters: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
});
