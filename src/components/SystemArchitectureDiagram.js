import React, { useState } from 'react';
import styles from './SystemArchitectureDiagram.module.css';

const SystemArchitectureDiagram = ({ architecture, projectName = 'Project' }) => {
  const [selectedNodeId, setSelectedNodeId] = useState(architecture?.nodes?.[0]?.id || null);

  if (!architecture || !architecture.nodes || architecture.nodes.length === 0) {
    return null;
  }

  const { description, nodes, connections = [] } = architecture;

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Helper to check if a node is connected to the active node
  const isConnected = (nodeId) => {
    if (!selectedNodeId || nodeId === selectedNodeId) return true;
    return connections.some(
      (c) =>
        (c.from === selectedNodeId && c.to === nodeId) ||
        (c.to === selectedNodeId && c.from === nodeId)
    );
  };

  const getNodeTypeIcon = (type) => {
    switch (type) {
      case 'client':
        return '💻';
      case 'service':
        return '⚡';
      case 'backend':
        return '⚙️';
      case 'storage':
        return '🗄️';
      case 'ai':
        return '✨';
      default:
        return '📦';
    }
  };

  return (
    <div className={styles.diagramContainer}>
      <div className={styles.headerRow}>
        <div className={styles.diagramTitleGroup}>
          <span className={styles.diagramLabel}>SYSTEM ARCHITECTURE</span>
          <span className={styles.hintText}>Hover or tap nodes to inspect data flow</span>
        </div>
      </div>

      <p className={styles.archOverview}>{description}</p>

      {/* Nodes Pipeline Container */}
      <div className={styles.pipelineWrapper} role="region" aria-label={`${projectName} architecture pipeline`}>
        <div className={styles.nodesTrack}>
          {nodes.map((node, index) => {
            const isSelected = node.id === activeNode?.id;
            const connected = isConnected(node.id);

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <button
                  type="button"
                  className={`${styles.nodeBox} ${isSelected ? styles.selectedNode : ''} ${
                    !connected ? styles.dimmedNode : ''
                  }`}
                  onClick={() => setSelectedNodeId(node.id)}
                  onMouseEnter={() => setSelectedNodeId(node.id)}
                  aria-pressed={isSelected}
                  aria-label={`${node.label}: ${node.role}`}
                >
                  <div className={styles.nodeHeader}>
                    <span className={styles.nodeIcon}>{getNodeTypeIcon(node.type)}</span>
                    <span className={styles.nodeTypeBadge}>{node.type || 'service'}</span>
                  </div>

                  <h4 className={styles.nodeTitle}>{node.label}</h4>
                  <p className={styles.nodeRole}>{node.role}</p>

                  <div className={styles.nodeFooter}>
                    <span className={styles.protocolBadge}>{node.protocol || 'JSON/HTTP'}</span>
                  </div>
                </button>

                {/* Connector Arrow (if not last) */}
                {index < nodes.length - 1 && (
                  <div className={styles.connector} aria-hidden="true">
                    <div className={styles.connectorLine} />
                    <span className={styles.connectorArrow}>→</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Card */}
      {activeNode && (
        <div className={styles.detailCard} aria-live="polite">
          <div className={styles.detailHeader}>
            <div className={styles.detailTitleGroup}>
              <span className={styles.detailIcon}>{getNodeTypeIcon(activeNode.type)}</span>
              <div>
                <h5 className={styles.detailTitle}>{activeNode.label}</h5>
                <span className={styles.detailSub}>{activeNode.role}</span>
              </div>
            </div>
            <div className={styles.detailMeta}>
              <span className={styles.protocolLabel}>PROTOCOL:</span>
              <span className={styles.protocolValue}>{activeNode.protocol || 'HTTPS'}</span>
            </div>
          </div>

          <p className={styles.detailText}>{activeNode.details}</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(SystemArchitectureDiagram);
