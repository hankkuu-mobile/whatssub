import PropTypes from 'prop-types';
import React from 'react';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

/**
This component is being used at SearchService screen.
Showing service.

Orientation behaviors
- ImageContainer will be stretched/shrinks

By splitting containers and contents(image, name, category),
- it has better readability and
- its container design can be modified/reused easily

Simple container explanation
- Container - top (contain below three containers)
- ImageContainer - left most, fixed size
- ServiceContainer - stretch/shrinks
- NameContainer - right most, fixed size

To reuse, you may want to refactor its containers out in the future

To debug its layout manually, you may put background-color to each Containers easily
 */

const Container = styled.View`
  background-color: white;
  flex-direction: row;
  align-items: stretch;
  height: 70;
`;
const ImageContainer = styled.View`
  flex-basis: 78;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
`;
const ServiceImage = styled.Image`
  width: 42;
  height: 42;
  border-radius: 5;
`;
const NameContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
`;
const Name = styled.Text`
  font-size: 16;
  color: #323b43;
  letter-spacing: -0.5;
`;
const CategoryContainer = styled.View`
  flex-basis: 108;
  flex-grow: 0;
  justify-content: center;
  padding-right: 24;
`;
const Category = styled.Text`
  text-align: right;
  font-size: 14;
  color: #99a2aa;
`;

const ServiceElement = ({ imageSource, name, category }) => {
  return (
    <Container>
      <ImageContainer>
        <ServiceImage source={imageSource} />
      </ImageContainer>
      <NameContainer>
        <Name testID='SERVICE_ELEMENT_NAME'>{name}</Name>
      </NameContainer>
      <CategoryContainer>
        <Category testID='SERVICE_ELEMENT_CATEGORY'>{category}</Category>
      </CategoryContainer>
    </Container>
  );
};

ServiceElement.propTypes = {
  imageSource: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ServiceElement;
