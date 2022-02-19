import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.form`
  h2{
      color: var(--text-title);
      font-size: 1.5rem;
      margin-bottom: 2rem;
  }

  input{
      width: 100%;
      padding: 0 1.5rem;
      height: 4rem;
      border-radius: 0.25rem;

      border: 1px solid;
      border-color: var(--modal-input-border);
      background-color: var(--input-background);

      &::placeholder{
          color: var(--text-body);
      }

      & + input {
          margin-top: 1rem;
      }
  }

  button[type="submit"]{
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background-color: var(--green);
    border: 0;
    color: #fff;
    font-size: 1rem;
    border-radius: 0.25rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;
    &:hover {
        filter: brightness(0.9);
        
    }
  }
`;

export const TransactionTypeContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
`;

type TransactionTypeButtonProps = {
    isActive: boolean;
    activeColor: 'green' | 'red'
}

const colors = {
  red: '#E52e54',
  blue: '#5429CC',
  green: '#33CC95',
};

export const TransactionTypeButton = styled.button<TransactionTypeButtonProps>`
    height: 4rem;
    border: 1px solid;
    border-color: var(--modal-input-border);
    border-radius: 0.25rem;

    background-color: transparent;


    background: ${({ isActive, activeColor }) => (isActive ? transparentize(0.9, colors[activeColor]) : 'transparent')};

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        border-color: ${darken(0.1, '#d7d7d7')};
    }

    img{
        height: 20px;
        width: 20px;
    }

    span {
        display: inline-block;
        margin-left: 1rem;
        font-size: 1rem;
        color: var(--text-title)
    }
`;
