/*
 * Copyright (C) 2020 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import NotificationPreferences from '../NotificationPreferences'
import {render} from '@testing-library/react'
import React from 'react'

function defaultProps(overrides) {
  return {
    contextType: 'course',
    contextName: 'Course01',
    enabled: false,
    updatePreference: jest.fn(),
    notificationPreferences: {channels: []},
    ...overrides
  }
}

describe('Notification Preferences', () => {
  it('renders the context name next to mute toggle', () => {
    const props = defaultProps()

    const {getByText} = render(<NotificationPreferences {...props} />)

    expect(getByText('Enable Notifications for Course01')).toBeInTheDocument()
  })

  it('renders the appropriate alert text for course context', () => {
    const props = defaultProps()
    const {getByText} = render(<NotificationPreferences {...props} />)

    expect(
      getByText(
        'Course-level notifications are inherited from your account-level notification settings. Adjusting notifications for this course will override notifications at the account level.'
      )
    ).toBeInTheDocument()
  })

  it('renders the appropriate alert text for account context', () => {
    const props = defaultProps({
      contextType: 'account',
      contextName: 'Dope Account'
    })
    const {getByText} = render(<NotificationPreferences {...props} />)

    expect(
      getByText(
        'Account-level notifications apply to all courses. Notifications for individual courses can be changed within each course and will override these notifications.'
      )
    ).toBeInTheDocument()
  })
})
