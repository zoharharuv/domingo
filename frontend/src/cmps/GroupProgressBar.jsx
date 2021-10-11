import { Tooltip } from '@material-ui/core';
export function GroupProgressBar({ tasks, Board }) {
  let statusCounter;
  let colors;

  let lengthItems;
  let titleItems;

  function labelMapping(type) {
    statusCounter = {}
    colors = []
    tasks.forEach(task => {
      const { title, color } = task[type]
      statusCounter[title] = (statusCounter[title] ?? 0) + 1
      if (!colors.includes(color)) colors.push(color)
    });
    lengthItems = Object.values(statusCounter)
    titleItems = Object.keys(statusCounter)
  }




  return (
    <section className="group-progress-bar flex justify-end">
      <div className="status-progress flex">
        {labelMapping('status')}

        {colors.map((item, index) => (
          <Tooltip
            key={index}
            arrow
            title={<h2 className="header-tool-tip">
              {`${titleItems[index]} ${(((lengthItems[index] / tasks.length * 100)).toFixed(2) + '%')}`}
            </h2>}
            placement="bottom">
            <div
              className="group-progress-item"
              style=
              {{
                backgroundColor: item,
                width: (lengthItems[index] / tasks.length * 100) + '%'
              }}

            >{'\xa0'}</div>
          </Tooltip>
        ))}
      </div>

      <div className="priority-progress flex">
        {labelMapping('priority')}

        {colors.map((item, index) => (
          <Tooltip
            key={item}
            arrow
            title={<h2 className="header-tool-tip">
              {`${titleItems[index]} ${(((lengthItems[index] / tasks.length * 100)).toFixed(2) + '%')}`}
            </h2>}
            placement="bottom">
            <div
              className="group-progress-item"
              style=
              {{
                backgroundColor: item,
                width: (lengthItems[index] / tasks.length * 100) + '%'
              }}

            >{'\xa0'}</div>
          </Tooltip>
        ))}
      </div>
    </section>
  )
}

