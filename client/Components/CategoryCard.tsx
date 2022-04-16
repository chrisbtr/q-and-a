import * as React from "react";
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

interface CategoryCardProps {
  title: string;
  description?: string;
  source: ImageSourcePropType;
  viewCategoryHandler?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  return (
    <Card mode="outlined" style={{ margin: 5 }}>
      <Card.Content>
        <Title>{props.title}</Title>
        <Paragraph>{props.description}</Paragraph>
      </Card.Content>
      <Card.Cover source={props.source} />
      <Card.Actions>
        <TouchableOpacity>
          <Button onPress={props.viewCategoryHandler}>View Category</Button>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

export default CategoryCard;
