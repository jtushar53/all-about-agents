const ROLES = ['teacher', 'critic', 'engineer', 'peer'];

export default function PromptTweaker({ temp, setTemp, role, setRole, shots, setShots }) {
  return (
    <div
      style={{
        marginTop: 14,
        paddingTop: 12,
        borderTop: '1px solid rgba(127,232,255,0.22)',
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: '#9fb2da',
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          marginBottom: 10,
        }}
      >
        live prompt tweaker
      </div>

      <label style={{ display: 'block', fontSize: 12, color: '#c9d3ea', marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>temperature</span>
          <span style={{ color: '#7fe8ff' }}>{temp.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1.5"
          step="0.05"
          value={temp}
          onChange={(e) => setTemp(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: '#7fe8ff' }}
        />
      </label>

      <label style={{ display: 'block', fontSize: 12, color: '#c9d3ea', marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>role</span>
          <span style={{ color: '#7fe8ff' }}>{role}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                flex: 1,
                padding: '4px 6px',
                fontSize: 11,
                background: role === r ? 'rgba(127,232,255,0.18)' : 'transparent',
                border: `1px solid ${role === r ? '#7fe8ff' : 'rgba(127,232,255,0.25)'}`,
                color: role === r ? '#7fe8ff' : '#c9d3ea',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </label>

      <label style={{ display: 'block', fontSize: 12, color: '#c9d3ea', marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>few-shot examples</span>
          <span style={{ color: '#7fe8ff' }}>{shots}</span>
        </div>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={shots}
          onChange={(e) => setShots(parseInt(e.target.value, 10))}
          style={{ width: '100%', accentColor: '#7fe8ff' }}
        />
      </label>

      <pre
        style={{
          marginTop: 10,
          padding: 10,
          background: 'rgba(0,0,0,0.5)',
          borderRadius: 6,
          fontSize: 11,
          color: '#c9d3ea',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          whiteSpace: 'pre-wrap',
          border: '1px solid rgba(120,160,255,0.15)',
        }}
      >
        {`system: You are a ${role}.\ntemperature: ${temp.toFixed(2)}\n`}
        {shots > 0 ? `few-shots: ${shots} example${shots > 1 ? 's' : ''}\n` : ''}
        {'user: <your prompt here>'}
      </pre>
    </div>
  );
}
