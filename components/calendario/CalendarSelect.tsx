import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface CalendarSelectOption<T extends string | number> {
  label: string;
  value: T;
}

interface CalendarSelectProps<T extends string | number> {
  label: string;
  placeholder: string;
  value: T | null;
  options: CalendarSelectOption<T>[];
  onChange: (value: T) => void;
}

export default function CalendarSelect<T extends string | number>({
  label,
  placeholder,
  value,
  options,
  onChange,
}: CalendarSelectProps<T>) {
  const [visible, setVisible] = useState(false);
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

  const handleSelect = (nextValue: T) => {
    onChange(nextValue);
    setVisible(false);
  };

  return (
    <View className="flex-1">
      <Text className="mb-1 text-xs font-bold text-[#212529]">{label}</Text>
      <TouchableOpacity
        activeOpacity={0.75}
        className="min-h-[44px] flex-row items-center justify-between rounded-lg border border-gray-300 bg-white px-3"
        onPress={() => setVisible(true)}
      >
        <Text className={value ? "text-[#212529]" : "text-gray-500"}>
          {selectedLabel}
        </Text>
        <FontAwesome name="chevron-down" size={12} color="#6C757D" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/40 px-5"
          onPress={() => setVisible(false)}
        >
          <Pressable className="max-h-[70%] w-full max-w-[380px] rounded-2xl bg-white p-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-[#212529]">{label}</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <FontAwesome name="times" size={20} color="#212529" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => {
                const selected = option.value === value;

                return (
                  <TouchableOpacity
                    key={String(option.value)}
                    activeOpacity={0.75}
                    className={`mb-2 flex-row items-center justify-between rounded-lg border px-4 py-3 ${
                      selected
                        ? "border-[#0D6EFD] bg-[#E8F1FF]"
                        : "border-gray-200 bg-white"
                    }`}
                    onPress={() => handleSelect(option.value)}
                  >
                    <Text
                      className={`text-base ${
                        selected ? "font-bold text-[#0D6EFD]" : "text-[#212529]"
                      }`}
                    >
                      {option.label}
                    </Text>
                    {selected && (
                      <FontAwesome name="check" size={16} color="#0D6EFD" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
