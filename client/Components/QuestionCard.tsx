import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
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
        titleStyle={styles.title}
        subtitleStyle={styles.title}
      />
      <Card.Content>
        <Title>Question</Title>
        <Paragraph style={styles.paragraph} numberOfLines={4}>
          {question}
        </Paragraph>
      </Card.Content>
      <Card.Content>
        <Title>Answer</Title>
        <Paragraph style={styles.paragraph} numberOfLines={4}>
          {answer}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 24,
    marginLeft: 12,
    marginRight: 12,
    height: 200,
    width: 300,
  },
  title: {
    textAlign: "center",
  },
  paragraph: {
    marginLeft: 10,
  },
});

export default QuestionCard;
