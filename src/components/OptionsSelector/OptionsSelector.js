import {
  Box,
  useRadio,
  useTheme,
  useColorMode,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";

const Option = (props) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg:
            colorMode === "light"
              ? colors?.brand?.mainColor
              : colors?.brand?.mainColorWhite,
          color: "white",
          borderColor:
            colorMode === "light"
              ? colors?.brand?.mainColor
              : colors?.brand?.mainColorWhite,
        }}
        _focus={{ boxShadow: "outline" }}
        px={2}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

const OptionsSelector = ({
  name = "options-selector",
  onChange,
  value,
  options,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: value,
    value,
    onChange: (newValue) => {
      onChange({ target: { name, value: newValue } });
    },
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((option) => {
        const radio = getRadioProps({ ...option, value: option.code });
        return (
          <Option key={option.code} {...radio}>
            {option.name}
          </Option>
        );
      })}
    </HStack>
  );
};

export default OptionsSelector;
