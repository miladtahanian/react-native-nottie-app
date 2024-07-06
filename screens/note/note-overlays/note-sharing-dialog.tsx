import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, TextInput, View } from "react-native";
import { Text } from "react-native-fast-text";
import { Dialog } from "../../../components";
import { useTheme } from "../../../hooks/use-theme";
import { shadows } from "../../../ui-config";
import { moderateFontScale, moderateScale } from "../../../utils";
interface FormProps {
  fileName: string;
}
interface NoteSharingDialogProps {
  visible: boolean;
  onCancel: () => void;
  sharePdf: (onCancel: () => void) => void;
  shareImage: (onCancel: () => void) => void;
  savePdf: (onCancel: () => void) => void;
  shareNote: (onCancel: () => void, fileName?: string) => void;
  saveNote: (onCancel: () => void, fileName?: string) => void;
  saveImage: (onCancel: () => void) => void;
}
interface SharingOptionProp {
  label: string;
  icon: string;
  onSave: () => void;
  onShare: () => void;
}
export function NoteSharingDialog({
  visible,
  shareImage,
  sharePdf,
  onCancel,
  saveImage,
  savePdf,
  shareNote,
  saveNote,
}: NoteSharingDialogProps) {
  const [option, setOption] = useState<number>(0);
  const { handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      fileName: "",
    },
  });
  const Icon = useCallback(() => {
    const iconName = options.find((_, i) => i === option)?.icon;
    return <FontAwesome5 size={30} color={theme.onPrimary} name={iconName} />;
  }, [option]);
  const theme = useTheme();
  const options: SharingOptionProp[] = [
    {
      label: "عکس",
      icon: "file-image",
      onSave: () => saveImage(onCancel),
      onShare: () => shareImage(onCancel),
    },
    {
      label: "فایل PDF",
      icon: "file-pdf",
      onSave: () => savePdf(onCancel),
      onShare: () => sharePdf(onCancel),
    },
    {
      label: "فرمت Nottie",
      icon: "file-alt",
      onShare: handleSubmit(({ fileName }) => {
        if (fileName.length > 0) {
          shareNote(onCancel, fileName);
        } else {
          shareNote(onCancel);
        }
      }),
      onSave: handleSubmit(({ fileName }) => {
        if (fileName.length > 0) {
          saveNote(onCancel, fileName);
        } else {
          saveNote(onCancel);
        }
      }),
    },
  ];

  return (
    <Dialog
      title="اشتراک گذاری فایل به صورت"
      onCancel={onCancel}
      styles={{ width: "90%" }}
      animation="fade"
      visible={visible}
      buttons={[
        {
          title: "ذخیره",
          onPress: options[option].onSave,

          hidden: option !== 0 && Platform.OS === "ios",
        },
        {
          title: "اشتراک گذاری",
          onPress: options[option].onShare,
        },
      ]}
    >
      <View
        style={{ flexDirection: "column", alignItems: "center", padding: 26 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon />
          <Picker
            style={{ flex: 1 }}
            selectedValue={option}
            mode="dropdown"
            dropdownIconColor={theme.onPrimary}
            onValueChange={(_, i) => setOption(i)}
          >
            {options.map(({ label }, i) => {
              return (
                <Picker.Item
                  color={theme.onPrimary}
                  key={i}
                  style={{ backgroundColor: theme.primary }}
                  value={i}
                  label={label}
                />
              );
            })}
          </Picker>
        </View>
        {option === 2 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 6,
            }}
          >
            <Controller
              name="fileName"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={theme.placeholder}
                  placeholder="نام فایل را اینجا وارد کنید"
                  keyboardType="ascii-capable"
                  autoComplete="off"
                  secureTextEntry={false}
                  smartInsertDelete={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={{
                    ...shadows(theme),
                    paddingHorizontal: moderateScale(6),
                    // paddingVertical: verticalScale(4),
                    maxWidth: "80%",

                    backgroundColor: theme.primary,
                    borderRadius: 6,
                    fontSize: moderateFontScale(12),
                    color: theme.onPrimary,
                  }}
                />
              )}
            />

            <Text
              style={{
                fontSize: moderateFontScale(16),
                color: theme.onPrimary,
              }}
            >
              .nottie
            </Text>
          </View>
        )}
      </View>
    </Dialog>
  );
}
