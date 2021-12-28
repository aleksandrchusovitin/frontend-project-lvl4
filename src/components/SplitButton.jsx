import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const SplitButton = ({
  id,
  name,
  isCurrentChannel,
  handleChangeChannel,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const classNameSplitButton = cn('w-100 rounded-0 text-start text-truncate', { 'btn-secondary': isCurrentChannel });

  const { t } = useTranslation();

  return (
    <Dropdown role="group" className="d-flex btn-group">
      <Button
        className={classNameSplitButton}
        variant={isCurrentChannel && 'secondary'}
        onClick={handleChangeChannel(id)}
      >
        {`# ${name}`}
      </Button>

      <Dropdown.Toggle
        split
        variant={isCurrentChannel && 'secondary'}
        className="flex-grow-0"
        aria-haspopup="true"
        aria-label={t('mainPage.buttons.extraButtonForChannel')}
      />

      <Dropdown.Menu>
        <Dropdown.Item
          href="#"
          onClick={handleRemoveChannel(id, name, 'removingChannel')}
        >
          {t('mainPage.buttons.channelDelete')}
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={handleRenameChannel(id, name, 'renamingChannel')}
        >
          {t('mainPage.buttons.channelRename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SplitButton;
