import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LifeCounter() {
  const [playerCounts, setPlayerCounts] = useState([20, 20, 20, 20]);
  const [numPlayers, setNumPlayers] = useState(2);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showDiceRollResult, setShowDiceRollResult] = useState(false);
  const [diceRollResult, setDiceRollResult] = useState("");

  const incrementPlayer = (player) => {
    const newCounts = [...playerCounts];
    newCounts[player] += 1;
    setPlayerCounts(newCounts);
  };

  const decrementPlayer = (player) => {
    const newCounts = [...playerCounts];
    if (newCounts[player] > 0) {
      newCounts[player] -= 1;
      setPlayerCounts(newCounts);
    }
  };

  const resetCounts = () => {
    setPlayerCounts([20, 20, 20, 20]);
  };

  const togglePlayerModal = () => {
    setShowPlayerModal(!showPlayerModal);
  };

  const setPlayers = (num) => {
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

  const playerColors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF9F40"];

  const renderPlayerContainer = (player, count, color, position) => (
    <View
      key={player}
      style={[
        styles.playerContainer,
        { backgroundColor: color },
        styles[`player${numPlayers}${position}`],
      ]}
    >
      <Text style={[styles.playerTitle, styles[`playerTitle${position}`]]}>
        Player {player + 1}
      </Text>
      <View
        style={[styles.countContainer, styles[`countContainer${position}`]]}
      >
        <TouchableOpacity
          onPress={() => decrementPlayer(player)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.countText, numPlayers > 2 && styles.smallerText]}>
          {count}
        </Text>
        <TouchableOpacity
          onPress={() => incrementPlayer(player)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View
          style={[styles.playersContainer, styles[`container${numPlayers}`]]}
        >
          {playerCounts
            .slice(0, numPlayers)
            .map((count, index) =>
              renderPlayerContainer(
                index,
                count,
                playerColors[index],
                ["topLeft", "topRight", "bottomLeft", "bottomRight"][index],
              ),
            )}
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
  player2topLeft: {
    flex: 1,
    transform: [{ rotate: "180deg" }],
  },
  player2topRight: {
    flex: 1,
  },
  player3topLeft: {
    width: "50%",
    height: "50%",
    transform: [{ rotate: "180deg" }],
  },
  player3topRight: {
    width: "50%",
    height: "50%",
    transform: [{ rotate: "180deg" }],
  },
  player3bottomLeft: {
    width: "100%",
    height: "50%",
  },
  player4topLeft: {
    width: "50%",
    height: "50%",
    transform: [{ rotate: "180deg" }],
  },
  player4topRight: {
    width: "50%",
    height: "50%",
    transform: [{ rotate: "180deg" }],
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
  countContainertopLeft: {
    transform: [{ rotate: "180deg" }],
  },
  countContainertopRight: {
    transform: [{ rotate: "180deg" }],
  },
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
    fontFamily: "Helvetica Neue",
  },
  middleContainer: {
    alignItems: "center",
    marginVertical: 10,
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  resetButton: {
    marginHorizontal: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 28,
    marginBottom: 20,
    fontFamily: "Helvetica Neue",
    color: "#1c1c1c",
  },
  modalOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  modalOptionText: {
    fontSize: 24,
    fontFamily: "Helvetica Neue",
    color: "#fff",
  },
  modalResultText: {
    fontSize: 32,
    marginBottom: 20,
    fontFamily: "Helvetica Neue",
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
    fontFamily: "Helvetica Neue",
  },
  playerTitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
    fontFamily: "Helvetica Neue",
  },
  playerTitletopLeft: {
    transform: [{ rotate: "180deg" }],
  },
  playerTitletopRight: {
    transform: [{ rotate: "180deg" }],
  },
});
