import React, { useEffect } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type AutoDismissModalProps = {
  visible: boolean;
  title: string;
  description?: string;
  duration?: number;
  showCloseButton?: boolean;
  onClose: () => void;
};

const AutoDismissModal = ({
  visible,
  title,
  description,
  duration = 2000,
  showCloseButton = true,
  onClose,
}: AutoDismissModalProps) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, visible]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/40 px-6">
        <View className="w-full rounded-2xl bg-white px-6 py-7 items-center shadow-lg">
          {showCloseButton && (
            <TouchableOpacity
              className="absolute right-4 top-4 h-8 w-8 items-center justify-center rounded-full bg-gray-100"
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color="#374151" />
            </TouchableOpacity>
          )}

          <Text className="text-gray-900 text-xl font-bold text-center">{title}</Text>

          {!!description && (
            <Text className="text-gray-600 text-base text-center mt-3">
              {description}
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            className="mt-6 px-6 py-3 rounded-xl bg-teal-700"
            onPress={onClose}
          >
            <Text className="text-white font-bold">Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AutoDismissModal;
