import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

// Keep the device's screen on while the app is running
SplashScreen.preventAutoHideAsync();

type Position =
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

type StyleKey = keyof typeof styles;

const getDynamicStyle = (styleKey: string): ViewStyle => {
  return styles[styleKey as keyof typeof styles] as ViewStyle;
};

export default function LifeCounter() {
  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": Asset.fromModule(
      require("../assets/fonts/SpaceMono-Regular.ttf"),
    ).uri,
  });

  const [playerCounts, setPlayerCounts] = useState<number[]>([20, 20, 20, 20]);
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [showPlayerModal, setShowPlayerModal] = useState<boolean>(false);
  const [showDiceRollResult, setShowDiceRollResult] = useState<boolean>(false);
  const [diceRollResult, setDiceRollResult] = useState<string>("");
  const [commanderDamage, setCommanderDamage] = useState<number[][]>(
    Array(4).fill(Array(4).fill(0)),
  );
  const [showCommanderDamageModal, setShowCommanderDamageModal] =
    useState<boolean>(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const incrementPlayer = (player: number) => {
    const newCounts = [...playerCounts];
    newCounts[player] += 1;
    setPlayerCounts(newCounts);
  };

  const decrementPlayer = (player: number) => {
    const newCounts = [...playerCounts];
    if (newCounts[player] > 0) {
      newCounts[player] -= 1;
      setPlayerCounts(newCounts);
    }
  };

  const resetCounts = () => {
    setPlayerCounts([20, 20, 20, 20]);
    setCommanderDamage(Array(4).fill(Array(4).fill(0)));
  };

  const togglePlayerModal = () => {
    setShowPlayerModal(!showPlayerModal);
  };

  const setPlayers = (num: number) => {
    setNumPlayers(num);
    setShowPlayerModal(false);
  };

  const rollDice = () => {
    const players = ["Player 1", "Player 2", "Player 3", "Player 4"];
    const randomIndex = Math.floor(Math.random() * numPlayers);
    const result = players[randomIndex];
    setDiceRollResult(result);
    setShowDiceRollResult(true);
  };

  const updateCommanderDamage = (
    attacker: number,
    defender: number,
    damage: number,
  ) => {
    const newCommanderDamage = commanderDamage.map((row, i) =>
      row.map((val, j) =>
        i === attacker && j === defender ? Math.max(0, val + damage) : val,
      ),
    );
    setCommanderDamage(newCommanderDamage);
  };

  const playerColors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF9F40"];

  const renderPlayerContainer = (
    player: number,
    count: number,
    color: string,
    position: Position,
  ) => {
    const containerStyle = `player${numPlayers}${position}` as StyleKey;
    const titleStyle = `playerTitle${position}` as StyleKey;
    const countContainerStyle = `countContainer${position}` as StyleKey;

    // Determine if the content should be rotated (for top players)
    const shouldRotate = position.includes("top");

    return (
      <View
        key={player}
        style={[
          styles.playerContainer,
          { backgroundColor: color },
          getDynamicStyle(containerStyle),
        ]}
      >
        <Text
          style={[
            styles.playerTitle,
            getDynamicStyle(titleStyle) as TextStyle,
            shouldRotate && styles.rotatedText,
          ]}
        >
          Player {player + 1}
        </Text>
        <View
          style={[
            styles.countContainer,
            getDynamicStyle(countContainerStyle) as ViewStyle,
          ]}
        >
          <TouchableOpacity
            onPress={() => decrementPlayer(player)}
            style={styles.button}
          >
            <Text
              style={[styles.buttonText, shouldRotate && styles.rotatedText]}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.countText,
              numPlayers > 2 && styles.smallerText,
              shouldRotate && styles.rotatedText,
            ]}
          >
            {count}
          </Text>
          <TouchableOpacity
            onPress={() => incrementPlayer(player)}
            style={styles.button}
          >
            <Text
              style={[styles.buttonText, shouldRotate && styles.rotatedText]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View
          style={[
            styles.playersContainer,
            getDynamicStyle(`container${numPlayers}`),
          ]}
        >
          {playerCounts.slice(0, numPlayers).map((count, index) => {
            let position: Position;
            if (numPlayers === 2) {
              position = index === 0 ? "top" : "bottom";
            } else if (numPlayers === 3) {
              position = ["bottom", "topLeft", "topRight"][index] as Position;
            } else {
              position = ["bottomLeft", "bottomRight", "topLeft", "topRight"][
                index
              ] as Position;
            }
            return renderPlayerContainer(
              index,
              count,
              playerColors[index],
              position,
            );
          })}
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={togglePlayerModal}>
                <Ionicons name="people" size={48} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetCounts}
              >
                <Ionicons name="refresh" size={48} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={rollDice}>
                <Ionicons name="dice" size={48} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowCommanderDamageModal(true)}
              >
                <Ionicons name="shield" size={48} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
          </View>
        </View>
        <Modal visible={showPlayerModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Number of Players</Text>
              <View style={styles.modalOptions}>
                {[2, 3, 4].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.modalOption,
                      { backgroundColor: playerColors[num - 1] },
                    ]}
                    onPress={() => setPlayers(num)}
                  >
                    <Text style={styles.modalOptionText}>{num} Players</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={showDiceRollResult} animationType="fade" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Dice Roll Result</Text>
              <Text style={styles.modalResultText}>
                {diceRollResult} goes first!
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowDiceRollResult(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          visible={showCommanderDamageModal}
          animationType="slide"
          transparent
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Commander Damage</Text>
              {playerCounts.slice(0, numPlayers).map((_, attacker) => (
                <View key={attacker} style={styles.commanderDamageRow}>
                  <Text style={styles.commanderDamageLabel}>
                    Player {attacker + 1}
                  </Text>
                  {playerCounts.slice(0, numPlayers).map(
                    (_, defender) =>
                      attacker !== defender && (
                        <View key={defender} style={styles.commanderDamageCell}>
                          <Text style={styles.commanderDamageValue}>
                            {commanderDamage[attacker][defender]}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              updateCommanderDamage(attacker, defender, 1)
                            }
                            style={styles.commanderDamageButton}
                          >
                            <Text style={styles.commanderDamageButtonText}>
                              +
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              updateCommanderDamage(attacker, defender, -1)
                            }
                            style={styles.commanderDamageButton}
                          >
                            <Text style={styles.commanderDamageButtonText}>
                              -
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ),
                  )}
                </View>
              ))}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowCommanderDamageModal(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  playersContainer: {
    flex: 1,
  },
  container2: {
    flexDirection: "column",
  },
  container3: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container4: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  playerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  player2top: {
    flex: 1,
  },
  player2bottom: {
    flex: 1,
  },
  player3topLeft: {
    width: "50%",
    height: "50%",
  },
  player3topRight: {
    width: "50%",
    height: "50%",
  },
  player3bottom: {
    width: "100%",
    height: "50%",
  },
  player4topLeft: {
    width: "50%",
    height: "50%",
  },
  player4topRight: {
    width: "50%",
    height: "50%",
  },
  player4bottomLeft: {
    width: "50%",
    height: "50%",
  },
  player4bottomRight: {
    width: "50%",
    height: "50%",
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  countContainertop: {},
  countContainertopLeft: {},
  countContainertopRight: {},
  countText: {
    fontSize: 72,
    color: "#fff",
    textAlign: "center",
    fontFamily: "SpaceMono-Regular",
  },
  smallerText: {
    fontSize: 64,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 48,
    color: "#fff",
    fontFamily: "SpaceMono-Regular",
  },
  middleContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    transform: [{ translateY: -50 }],
    alignItems: "center",
    marginVertical: 10,
    zIndex: 1,
    backgroundColor: "rgb(28, 28, 28)",
    paddingVertical: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  divider: {
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "95%",
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "SpaceMono-Regular",
    color: "#1c1c1c",
    textAlign: "center",
  },
  modalOptions: {
    width: "100%",
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 20,
    fontFamily: "SpaceMono-Regular",
    color: "#fff",
  },
  modalResultText: {
    fontSize: 32,
    marginBottom: 20,
    fontFamily: "SpaceMono-Regular",
    color: "#1c1c1c",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "SpaceMono-Regular",
  },
  playerTitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
    fontFamily: "SpaceMono-Regular",
  },
  playerTitletop: {},
  playerTitletopLeft: {},
  playerTitletopRight: {},
  rotatedText: {
    transform: [{ rotate: "180deg" }],
  },

  commanderDamageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  commanderDamageLabel: {
    width: 80,
    fontSize: 16,
    fontFamily: "SpaceMono-Regular",
    color: "#1c1c1c",
  },
  commanderDamageCell: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  commanderDamageValue: {
    fontSize: 18,
    fontFamily: "SpaceMono-Regular",
    color: "#1c1c1c",
    marginRight: 5,
  },
  commanderDamageButton: {
    backgroundColor: "#007AFF",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  commanderDamageButtonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SpaceMono-Regular",
  },
});
