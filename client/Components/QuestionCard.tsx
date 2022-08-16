import React from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { Answer } from '../api/questions';

interface QuestionCardProps {
  id: React.Key;
  subject?: string;
  category?: string;
  question?: string;
  answers?: Answer[];
  onPress?: (cardId: string) => void;
  CardProps?: React.ComponentProps<typeof Card>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  subject = "",
  category = "Other",
  question = "",
  answers = [],
  onPress,
  CardProps = {},
}) => {
  const answer = answers[0]?.content || '';

  const onPressHandler = () => {
    onPress?.(String(id));
  };

  return (
    <Card
      style={styles.card}
      key={`question-card-${id}`}
      onPress={onPressHandler}
      {...CardProps}
    >
      <Card.Title
        title={subject}
        subtitle={category}
      />
      <Card.Content>
        <Paragraph numberOfLines={3}>
          {question}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    maxHeight: 150,
    width: '95%',
    overflow: 'hidden'
  },
});

export default QuestionCard;
