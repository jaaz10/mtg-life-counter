import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LifeCounter() {
  const [player1Count, setPlayer1Count] = useState(20);
  const [player2Count, setPlayer2Count] = useState(20);
  const [player3Count, setPlayer3Count] = useState(20);
  const [player4Count, setPlayer4Count] = useState(20);
  const [numPlayers, setNumPlayers] = useState(2);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showDiceRollResult, setShowDiceRollResult] = useState(false);
  const [diceRollResult, setDiceRollResult] = useState("");

  const incrementPlayer = (player: number) => {
    if (player === 1) {
      setPlayer1Count(player1Count + 1);
    } else if (player === 2) {
      setPlayer2Count(player2Count + 1);
    } else if (player === 3) {
      setPlayer3Count(player3Count + 1);
    } else if (player === 4) {
      setPlayer4Count(player4Count + 1);
    }
  };

  const decrementPlayer = (player: number) => {
    if (player === 1 && player1Count > 0) {
      setPlayer1Count(player1Count - 1);
    } else if (player === 2 && player2Count > 0) {
      setPlayer2Count(player2Count - 1);
    } else if (player === 3 && player3Count > 0) {
      setPlayer3Count(player3Count - 1);
    } else if (player === 4 && player4Count > 0) {
      setPlayer4Count(player4Count - 1);
    }
  };

  const resetCounts = () => {
    setPlayer1Count(20);
    setPlayer2Count(20);
    setPlayer3Count(20);
    setPlayer4Count(20);
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

  const playerColors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF9F40"];

  return (
    <View style={styles.container}>
      {numPlayers >= 4 && (
        <View
          style={[
            styles.player4Container,
            { backgroundColor: playerColors[3] },
          ]}
        >
          <Text style={styles.playerTitle}>Player 4</Text>
          <View style={styles.countContainer}>
            <TouchableOpacity onPress={() => decrementPlayer(4)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.countText}>{player4Count}</Text>
            <TouchableOpacity onPress={() => incrementPlayer(4)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {numPlayers >= 3 && (
        <View
          style={[
            styles.player3Container,
            { backgroundColor: playerColors[2] },
          ]}
        >
          <Text style={styles.playerTitle}>Player 3</Text>
          <View style={styles.countContainer}>
            <TouchableOpacity onPress={() => decrementPlayer(3)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.countText}>{player3Count}</Text>
            <TouchableOpacity onPress={() => incrementPlayer(3)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View
        style={[styles.player2Container, { backgroundColor: playerColors[1] }]}
      >
        <Text style={styles.playerTitle}>Player 2</Text>
        <View style={styles.countContainer}>
          <TouchableOpacity onPress={() => decrementPlayer(2)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>{player2Count}</Text>
          <TouchableOpacity onPress={() => incrementPlayer(2)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={togglePlayerModal}>
              <Ionicons name="people" size={48} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton} onPress={resetCounts}>
              <Ionicons name="refresh" size={48} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={rollDice}>
              <Ionicons name="dice" size={48} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
        </View>
      </View>
      <View
        style={[styles.player1Container, { backgroundColor: playerColors[0] }]}
      >
        <Text style={styles.playerTitle}>Player 1</Text>
        <View style={styles.countContainer}>
          <TouchableOpacity onPress={() => decrementPlayer(1)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>{player1Count}</Text>
          <TouchableOpacity onPress={() => incrementPlayer(1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={showPlayerModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Number of Players</Text>
            <View style={styles.modalOptions}>
              <TouchableOpacity
                style={[
                  styles.modalOption,
                  { backgroundColor: playerColors[1] },
                ]}
                onPress={() => setPlayers(2)}
              >
                <Text style={styles.modalOptionText}>2 Players</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalOption,
                  { backgroundColor: playerColors[2] },
                ]}
                onPress={() => setPlayers(3)}
              >
                <Text style={styles.modalOptionText}>3 Players</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalOption,
                  { backgroundColor: playerColors[3] },
                ]}
                onPress={() => setPlayers(4)}
              >
                <Text style={styles.modalOptionText}>4 Players</Text>
              </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  player1Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  player2Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "180deg" }],
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  grid3Container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  grid4Container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  player3Container: {
    width: "48%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  player4Container: {
    width: "48%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "180deg" }],
    borderRadius: 10,
    marginBottom: 20,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  countText: {
    fontSize: 144,
    color: "#fff",
    flex: 1,
    textAlign: "center",
    fontFamily: "Helvetica Neue",
  },
  buttonText: {
    fontSize: 64,
    color: "#fff",
    paddingHorizontal: 20,
    fontFamily: "Helvetica Neue",
  },
  middleContainer: {
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 28,
    color: "#fff",
    marginBottom: 10,
    fontFamily: "Helvetica Neue",
  },
});
