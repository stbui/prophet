/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';

import { BasenameContext } from './BasenameContext';

/**
 *
 * @example
 * import { useBasename } from '@prophet/core';
 *
 * const ArticleLink = ({ title, id }) => {
 *    const basename = useBasename();
 *    return <a href={`${basename}/articles/${id}`}>{title}</a>;
 * };
 */
export const useBasename = () => useContext(BasenameContext);
